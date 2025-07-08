import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const body = await request.json();
    const { authCode } = body;
    const apiKey = process.env.EDU_CART_API_KEY;
    console.log('authCode:', authCode, apiKey,  process.env);
    if (!authCode || !apiKey) {
      return NextResponse.json({ error: '缺少認證碼或 API 金鑰' }, { status: 400 });
    }

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
    console.log('data:', data, res);
    // 只要 customer_id 存在且不是 -1 就算成功
    if (res.ok && data && typeof data.customer_id === 'number' && data.customer_id !== -1) {
      const response = NextResponse.json(data, { status: 200 });
      // 設定兩個 cookie：auth_token 以及 customer_id
      response.cookies.set('auth_token', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });
      response.cookies.set('customer_id', String(data.customer_id), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });
      return response;
    } else {
      // 失敗時回傳錯誤訊息
      return NextResponse.json(
        { error: '認證失敗，請確認認證碼或權限', detail: data },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: '驗證失敗', detail: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const response = NextResponse.json({ success: true });
    response.cookies.set('auth_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
      expires: new Date(0),
    });
    response.cookies.set('customer_id', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
      expires: new Date(0),
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'ログアウト処理中にエラーが発生しました。' },
      { status: 500 }
    );
  }
} 