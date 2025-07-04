import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('body:', body);
    const { authCode } = body;
    const apiKey = process.env.EDU_CART_API_KEY;

    if (!authCode || !apiKey) {
      return NextResponse.json({ error: '缺少認證碼或 API 金鑰' }, { status: 400 });
    }
    console.log(JSON.stringify({ auth_code: authCode }), apiKey, `https://api.edu-cart.jp/customers/auth`);
    // 呼叫外部 API
    const res = await fetch(`https://api.edu-cart.jp/customers/auth`, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ auth_code: authCode }),
    });
    
    const data = await res.json();
    console.log('data:', data);
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error(error, 123);
    return NextResponse.json({ error: '驗證失敗', detail: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    // 清除認證 cookie
    const cookieStore = await cookies();
    cookieStore.delete('auth_token');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('登出錯誤:', error);
    return NextResponse.json(
      { error: 'ログアウト処理中にエラーが発生しました。' },
      { status: 500 }
    );
  }
} 