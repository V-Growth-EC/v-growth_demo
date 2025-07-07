import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // 從 query string 取得 customer_id
    const { searchParams } = new URL(request.url);
    const customer_id = searchParams.get('customer_id');
    const apiKey = process.env.EDU_CART_API_KEY;
    // console.log('customer_id:', customer_id, 'apiKey:', apiKey);
    if (!customer_id || !apiKey) {
      return NextResponse.json({ error: '缺少 customer_id 或 API 金鑰' }, { status: 400 });
    }
    // console.log(customer_id, apiKey, `https://api.edu-cart.jp/customers/detail/${customer_id}`);
    // 呼叫外部 API 取得客戶詳細資料
    const res = await fetch(`https://api.edu-cart.jp/customers/detail/${customer_id}`, {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
      },
    });
    // console.log('外部API status:', res.status);
    
    if (!res.ok) {
      const errorText = await res.text();
      // console.log('外部API錯誤回應:', errorText);
      return NextResponse.json({ error: '外部API錯誤', status: res.status, detail: errorText }, { status: res.status });
    }
    
    const data = await res.json();
    // console.log('外部API回應:', data);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: '查詢失敗', detail: error.message }, { status: 500 });
  }
}
