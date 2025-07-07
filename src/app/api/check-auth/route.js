import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('auth_token');
  const customerIdCookie = cookieStore.get('customer_id');
  const customer_id = customerIdCookie ? Number(customerIdCookie.value) : undefined;

  if (
    authToken &&
    authToken.value === 'authenticated' &&
    typeof customer_id === 'number' &&
    customer_id !== -1
  ) {
    return NextResponse.json({ customer_id });
  }
  return NextResponse.json({});
} 