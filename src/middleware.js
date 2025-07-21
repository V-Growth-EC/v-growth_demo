import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Let's Encrypt 検証パスを許可
  if (pathname.startsWith('/.well-known/acme-challenge/')) {
    return NextResponse.next();
  }

  // /login のみ認証をスキップ
  if (pathname === '/login') {
    return NextResponse.next();
  }

  // Edge Runtime での HTTP リクエストを避けるため、直接 cookie をチェック
  const authToken = request.cookies.get('auth_token');
  const customerIdCookie = request.cookies.get('customer_id');
  const customer_id = customerIdCookie ? Number(customerIdCookie.value) : undefined;

  // 認証状態をチェック
  if (
    authToken &&
    authToken.value === 'authenticated' &&
    typeof customer_id === 'number' &&
    customer_id !== -1
  ) {
    // 認証済み、許可
    return NextResponse.next();
  } else {
    // 未認証、/login にリダイレクト
    console.log('未認証、/login にリダイレクト');
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// 静的リソースと API を除く、app/pages ルートのみをインターセプト
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images|api|\\.well-known).*)',
  ],
};