import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // 從 query string 取得 customer_id
    const { searchParams } = new URL(request.url);
    const customer_id = searchParams.get('customer_id');
    const apiKey = process.env.EDU_CART_API_KEY;
    if (!customer_id || !apiKey) {
      return NextResponse.json({ error: '缺少 customer_id 或 API 金鑰' }, { status: 400 });
    }
    console.log(customer_id, apiKey, `https://api.edu-cart.jp/products/overview/${customer_id}`);
    // 呼叫外部 API 取得商品列表
    const res = await fetch(`https://api.edu-cart.jp/products/overview/${customer_id}`, {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json({ error: '查詢失敗', detail: error.message }, { status: 500 });
  }
}
