import { NextRequest, NextResponse } from 'next/server';
import { findAdminByUsername } from '@/lib/dbClient';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username e password são obrigatórios' }, { status: 400 });
    }

    const admin = await findAdminByUsername(username).catch(() => null);

    if (!admin) {
      return NextResponse.json({ error: 'Usuário ou senha incorretos' }, { status: 401 });
    }

    if (admin.password !== password) {
      return NextResponse.json({ error: 'Usuário ou senha incorretos' }, { status: 401 });
    }

    const response = NextResponse.json({ success: true, message: 'Login bem-sucedido' }, { status: 200 });

    response.cookies.set('admin_token', `admin_${admin.id}_${Date.now()}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: 'Erro ao fazer login' }, { status: 500 });
  }
}
