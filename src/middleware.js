import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // 放行 Let's Encrypt 驗證路徑
  if (pathname.startsWith('/.well-known/acme-challenge/')) {
    return NextResponse.next();
  }

  // 只允許 /login 不經過認證
  if (pathname === '/login') {
    return NextResponse.next();
  }

  // 直接檢查 cookie，避免在 Edge Runtime 中發起 HTTP 請求
  const authToken = request.cookies.get('auth_token');
  const customerIdCookie = request.cookies.get('customer_id');
  const customer_id = customerIdCookie ? Number(customerIdCookie.value) : undefined;

  // 檢查認證狀態
  if (
    authToken &&
    authToken.value === 'authenticated' &&
    typeof customer_id === 'number' &&
    customer_id !== -1
  ) {
    // 已認證，放行
    return NextResponse.next();
  } else {
    // 未認證，跳轉到 /login
    console.log('未認證，跳轉到 /login');
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// 只攔截 app/pages 路由，不攔截靜態資源和 API
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images|api|\\.well-known).*)',
  ],
};