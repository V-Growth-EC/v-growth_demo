export async function POST(req) {
  const { orderId, amount, userName, email } = await req.json();

  // 組成要送給 proxy 的參數
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
    st_code: 10000, // 測試用
    xml: 1,
    return_url: `https://v-growth-demo.zeabur.app/cart/complete?orderId=${orderId}`,
    // 建議加一個 api_key 驗證
    api_key: process.env.EPSILON_PROXY_KEY || 'your_secret_key'
  };

  // 轉成 x-www-form-urlencoded
  const formBody = Object.entries(params)
    .map(([k, v]) => encodeURIComponent(k) + '=' + encodeURIComponent(v))
    .join('&');

  // POST 到 Xserver proxy
  const proxyRes = await fetch('https://twmamezou.xsrv.jp/epsilon-proxy.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formBody,
  });

  const text = await proxyRes.text();

  // 直接回傳 proxy 的 XML 給前端（或你要 parse 再回傳也可）
  return new Response(text, {
    status: 200,
    headers: { 'Content-Type': 'text/xml; charset=UTF-8' }
  });
}