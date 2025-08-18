import { parseStringPromise } from 'xml2js';
export async function POST(req) {
  const data = await req.json();

  // ユーザー情報を取得
  const info = data.customerInfo;

  // GMO/Epsilon Link Payment パラメータ
  const params = {
    contract_code: '74225830',
    classroom: data.classroom,
    order_number: data.orderId,
    item_code: data.products.ids,
    item_name: data.products.names,
    item_price: data.pricing.total,
    user_id: '1',
    user_name: info.name,
    orderer_name: info.name,
    mission_code: '1',
    process_code: '1',
    orderer_address: info.address,
    orderer_postal: info.postal.replace('-', ''), // ハイフンを除去
    orderer_tel: info.tel.replace(/-/g, ''),      // ハイフンを除去
    user_mail_add: info.email,
    st_code: '10000',
    return_url: 'https://demo3.edu-cart.jp/cart/complete?orderId=' + data.orderId,
    lang_id: 'ja',
    currency_id: 'JPY',
    xml: '1',
    version: '2',
    page_type: '2'
  };
  
  
  console.log('GMO に送信するパラメータ:', params);

  // x-www-form-urlencoded に変換
  const formBody = Object.entries(params)
    .map(([k, v]) => encodeURIComponent(k) + '=' + encodeURIComponent(v))
    .join('&');

  // GMO/Epsilon テスト API に直接 POST
  const gmoRes = await fetch('https://beta.epsilon.jp/cgi-bin/order/receive_order3.cgi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formBody,
  });

  const text = await gmoRes.text();
  console.log('GMO からの XML レスポンス:', text);

  // XML を解析
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