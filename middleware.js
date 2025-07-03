import { NextResponse } from 'next/server';

// 不需要認證的路徑
const publicPaths = ['/login', '/api/auth', '/api/check-auth'];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // 檢查是否為公開路徑
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));
  
  // 檢查是否已認證
  const isAuthenticated = request.cookies.has('auth_token');
  
  // 如果未認證且不是公開路徑，重定向到登入頁面
  if (!isAuthenticated && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // 如果已認證且訪問登入頁面，重定向到首頁
  if (isAuthenticated && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images).*)',
  ],
}; 