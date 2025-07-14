import { parseStringPromise } from 'xml2js';
export async function POST(req) {
  const { orderId, amount, userName, email } = await req.json();

  // GMO/Epsilon Link Payment 參數
  const params = {
    contract_code: '74225830',
    order_number: orderId, // 純數字短編號
    item_code: 'A1',
    item_name: 'Test',
    item_price: amount,
    user_id: 'u1',
    user_name: 'タロウ',
    orderer_name: 'タロウ',
    mission_code: '1',
    process_code: '1',
    orderer_address: '東京都渋谷区1-1-1',
    orderer_postal: '1234567',
    orderer_tel: '0312345678',
    user_mail_add: 'epsilon_test_9999@epsilon.jp',  
    st_code: '10000',
    return_url: 'https://demo3.edu-cart.jp/cart/complete?orderId=123456789',
    lang_id: 'ja',
    currency_id: 'JPY',
    xml: '1',
    version: '2',
    page_type: '2'
  };
  
  
  console.log('送出給 GMO 的參數:', params);

  // 轉成 x-www-form-urlencoded
  const formBody = Object.entries(params)
    .map(([k, v]) => encodeURIComponent(k) + '=' + encodeURIComponent(v))
    .join('&');

  // 直接 POST 到 GMO/Epsilon 測試 API
  const gmoRes = await fetch('https://beta.epsilon.jp/cgi-bin/order/receive_order3.cgi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formBody,
  });

  const text = await gmoRes.text();
  console.log('GMO 回傳 XML:', text);

  // 解析 XML
  const parsed = await parseStringPromise(text);

  const redirectUrlEncoded = parsed?.Epsilon_result?.result?.find(
    r => r?.$?.redirect
  )?.$?.redirect;

  const redirectUrl = redirectUrlEncoded ? decodeURIComponent(redirectUrlEncoded) : null;

  return new Response(JSON.stringify({ redirectUrl }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}