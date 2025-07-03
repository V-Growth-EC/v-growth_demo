import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// 從環境變數獲取認證碼
const VALID_AUTH_CODES = process.env.AUTH_CODES ? 
  process.env.AUTH_CODES.split(',').map(code => code.trim()) : 
  ['DEMO2024', 'TEST123', 'ACCESS2024'];

export async function POST(request) {
  try {
    const { authCode } = await request.json();
    
    if (!authCode || !VALID_AUTH_CODES.includes(authCode)) {
      return NextResponse.json(
        { error: '認証コードが正しくありません。' },
        { status: 401 }
      );
    }
    
    // 設定認證 cookie（24小時過期）
    const cookieStore = await cookies();
    cookieStore.set('auth_token', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/',
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('認證錯誤:', error);
    return NextResponse.json(
      { error: '認証処理中にエラーが発生しました。' },
      { status: 500 }
    );
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