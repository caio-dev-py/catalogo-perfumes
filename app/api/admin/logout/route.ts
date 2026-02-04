import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json(
    { success: true, message: 'Logout realizado com sucesso' },
    { status: 200 }
  );

  // Remover cookie do admin
  response.cookies.delete('admin_token');

  return response;
}
