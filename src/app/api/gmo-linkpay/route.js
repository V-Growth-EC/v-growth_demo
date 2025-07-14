import { parseStringPromise } from 'xml2js';
export async function POST(req) {
  const data = await req.json();

  // 取出使用者資訊
  const info = data.customerInfo;

  // GMO/Epsilon Link Payment 參數
  const params = {
    contract_code: '74225830',
    order_number: data.orderId,
    item_code: data.products.ids.split(',')[0],
    item_name: data.products.names.split(',')[0],
    item_price: data.pricing.total,
    user_id: '1',
    user_name: info.name,
    orderer_name: info.name,
    mission_code: '1',
    process_code: '1',
    orderer_address: info.address,
    orderer_postal: info.postal.replace('-', ''), // 去掉 -
    orderer_tel: info.tel.replace(/-/g, ''),      // 去掉 -
    user_mail_add: info.email,
    st_code: '10000',
    return_url: 'https://demo3.edu-cart.jp/cart/complete?orderId=' + data.orderId,
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