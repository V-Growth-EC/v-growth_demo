import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('auth_token');
  
  if (authToken && authToken.value === 'authenticated') {
    return NextResponse.json({ 
      authenticated: true,
      message: '認証済み'
    });
  }
  
  return NextResponse.json({ 
    authenticated: false,
    message: '未認証'
  });
} 