export async function POST(req) {
  const { orderId, amount, userName, email } = await req.json();
  const myUrl = "https://v-growth-demo.zeabur.app";
  console.log('myUrl', myUrl);
  // 組成イプシロン付款表單欄位
  const params = {
    contract_code: '74225830-2',
    order_number: orderId,
    item_code: 'ITEM001',
    item_name: 'テスト商品',
    item_price: amount,
    user_id: 'user001',
    user_name: userName || 'テスト太郎',
    mail: email || 'test@example.com',
    process_code: 1,
    st_code: 10000,
    xml: 1,
    return_url: "https://v-growth-demo.zeabur.app/cart/complete"
  };

  return Response.json({ epsilonParams: params });
}