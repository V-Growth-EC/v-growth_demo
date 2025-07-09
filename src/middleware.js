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

  // 其他頁面都要檢查認證
  const baseUrl = request.nextUrl.origin;
  const checkAuthRes = await fetch(`${baseUrl}/api/check-auth`, {
    headers: {
      cookie: request.headers.get('cookie') || '',
    },
    credentials: 'include',
  });

  const authData = await checkAuthRes.json();
  console.log(authData);
  if (!authData.customer_id) {
    // 未認證，跳轉到 /login
    console.log('未認證，跳轉到 /login');
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 已認證，放行
  return NextResponse.next();
}

// 只攔截 app/pages 路由，不攔截靜態資源和 API
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images|api|\\.well-known).*)',
  ],
};