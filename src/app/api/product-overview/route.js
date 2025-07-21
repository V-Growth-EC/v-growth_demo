import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // query string から customer_id を取得
    const { searchParams } = new URL(request.url);
    const customer_id = searchParams.get('customer_id');
    const apiKey = process.env.EDU_CART_API_KEY;
    if (!customer_id || !apiKey) {
      return NextResponse.json({ error: 'customer_id または API キーが不足しています' }, { status: 400 });
    }
    // console.log(customer_id, apiKey, `https://api.edu-cart.jp/products/overview/${customer_id}`);
    // 外部 API を呼び出して商品リストを取得
    const res = await fetch(`https://api.edu-cart.jp/products/overview/${customer_id}`, {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
      },
    });
    // console.log('外部API status:', res.status);
    
    if (!res.ok) {
      const errorText = await res.text();
      // console.log('外部APIエラーレスポンス:', errorText);
      return NextResponse.json({ error: '外部APIエラー', status: res.status, detail: errorText }, { status: res.status });
    }
    const data = await res.json();
    // console.log('外部APIレスポンス:', data);
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ error: 'クエリに失敗しました', detail: error.message }, { status: 500 });
  }
}
