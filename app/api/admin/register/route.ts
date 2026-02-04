import { NextRequest, NextResponse } from 'next/server';
import { createAdmin, countAdmins } from '@/lib/dbClient';

export async function POST(request: NextRequest) {
  try {
    const { username, password, secret } = await request.json();

    if (secret !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json({ error: 'Chave secreta inválida' }, { status: 403 });
    }

    if (!username || !password) {
      return NextResponse.json({ error: 'Username e password são obrigatórios' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Senha deve ter pelo menos 6 caracteres' }, { status: 400 });
    }

    try {
      await createAdmin(username, password);
      return NextResponse.json({ success: true, message: 'Admin criado com sucesso' }, { status: 201 });
    } catch (dbError) {
      const error = dbError as any;
      if (error?.code === '23505' || (error?.message && error.message.includes('duplicate'))) {
        return NextResponse.json({ error: 'Este usuário já existe' }, { status: 400 });
      }
      throw dbError;
    }
  } catch (error) {
    console.error('Error creating admin:', error);
    return NextResponse.json({ error: 'Erro ao criar admin' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const count = await countAdmins();
    return NextResponse.json({ adminCount: count }, { status: 200 });
  } catch (error) {
    console.error('Error checking admin count:', error);
    return NextResponse.json({ error: 'Erro ao verificar admins' }, { status: 500 });
  }
}
