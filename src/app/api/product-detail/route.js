import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // 從 query string 取得 product_id
    const { searchParams } = new URL(request.url);
    const product_id = searchParams.get('product_id');
    const apiKey = process.env.EDU_CART_API_KEY;
    if (!product_id || !apiKey) {
      return NextResponse.json({ error: '缺少 product_id 或 API 金鑰' }, { status: 400 });
    }

    // 呼叫外部 API 取得商品詳細資料
    const res = await fetch(`https://api.edu-cart.jp/products/detail/${product_id}`, {
      method: 'GET',
      headers: {
        'x-api-key': apiKey,
      },
    });

    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '查詢失敗', detail: error.message }, { status: 500 });
  }
}
