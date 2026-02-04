import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { username, password, secret } = await request.json();

    // Validação de segurança - requer uma chave secreta
    if (secret !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Chave secreta inválida' },
        { status: 403 }
      );
    }

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username e password são obrigatórios' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Senha deve ter pelo menos 6 caracteres' },
        { status: 400 }
      );
    }

    const db = getDb();
    
    try {
      const stmt = db.prepare('INSERT INTO admins (username, password) VALUES (?, ?)');
      stmt.run(username, password);

      return NextResponse.json(
        { success: true, message: 'Admin criado com sucesso' },
        { status: 201 }
      );
    } catch (dbError) {
      const error = dbError as Error;
      if (error.message.includes('UNIQUE constraint failed')) {
        return NextResponse.json(
          { error: 'Este usuário já existe' },
          { status: 400 }
        );
      }
      throw dbError;
    }
  } catch (error) {
    console.error('Error creating admin:', error);
    return NextResponse.json(
      { error: 'Erro ao criar admin' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Endpoint para ver quantos admins existem (sem mostrar dados sensíveis)
  try {
    const db = getDb();
    const stmt = db.prepare('SELECT COUNT(*) as count FROM admins');
    const result = stmt.get() as { count: number };

    return NextResponse.json(
      { adminCount: result.count },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error checking admin count:', error);
    return NextResponse.json(
      { error: 'Erro ao verificar admins' },
      { status: 500 }
    );
  }
}
