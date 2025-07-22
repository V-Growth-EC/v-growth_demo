import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // query string から customer_id を取得
    const { searchParams } = new URL(request.url);
    const customer_id = searchParams.get('customer_id');
    const apiKey = process.env.EDU_CART_API_KEY;
    // console.log('customer_id:', customer_id, 'apiKey:', apiKey);
    if (!customer_id || !apiKey) {
      return NextResponse.json({ error: '缺少 customer_id 或 API 金鑰' }, { status: 400 });
    }
    // console.log(customer_id, apiKey, `https://api.edu-cart.jp/customers/detail/${customer_id}`);
    // 外部 API を呼び出して顧客詳細情報を取得
    const res = await fetch(`https://api.edu-cart.jp/customers/detail/${customer_id}`, {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
      },
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json({ error: '外部API錯誤', status: res.status, detail: errorText }, { status: res.status });
    }
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: '查詢失敗', detail: error.message }, { status: 500 });
  }
}
