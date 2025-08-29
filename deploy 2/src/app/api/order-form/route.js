import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // query string から customer_id を取得
    const { searchParams } = new URL(request.url);
    const customer_id = searchParams.get('customer_id');
    const apiKey = process.env.EDU_CART_API_KEY;
    if (!customer_id || !apiKey) {
      return NextResponse.json({ error: '缺少 customer_id 或 API 金鑰' }, { status: 400 });
    }

    // 外部 API を呼び出して訂單表單情報を取得
    const res = await fetch(`https://api.edu-cart.jp/order/form/${customer_id}`, {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
      },
    });

    const data = await res.json();
    console.log('order-form data:', data);
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '查詢失敗', detail: error.message }, { status: 500 });
  }
} 