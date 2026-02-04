#!/usr/bin/env node

/**
 * Script para gerenciar administradores
 * Uso: node manage-admins.js [add|delete] [username] [password?]
 * Exemplos:
 *   node manage-admins.js add novo_admin senha123
 *   node manage-admins.js delete admin_para_remover
 */

const fs = require('fs');
const path = require('path');

// Carregar .env.local
const envPath = path.join(__dirname, '.env.local');
let adminSecret = 'change_this_to_a_strong_secret';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const match = envContent.match(/ADMIN_SECRET_KEY=(.+)/);
  if (match) {
    adminSecret = match[1].trim();
  }
}

const command = process.argv[2];
const username = process.argv[3];
const password = process.argv[4];

const API_URL = process.env.API_URL || 'http://localhost:3000';

async function addAdmin() {
  if (!username || !password) {
    console.error('❌ Uso: node manage-admins.js add <username> <password>');
    process.exit(1);
  }

  console.log(`📝 Criando admin: ${username}`);

  try {
    const res = await fetch(`${API_URL}/api/admin/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
        secret: adminSecret,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      console.log('✅ Admin criado com sucesso!');
      console.log(`   Usuário: ${username}`);
      console.log(`   Faça login em: ${API_URL}/admin/login`);
    } else {
      console.error('❌ Erro:', data.error || data.message);
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Erro de conexão:', error.message);
    process.exit(1);
  }
}

async function deleteAdmin() {
  if (!username) {
    console.error('❌ Uso: node manage-admins.js delete <username>');
    process.exit(1);
  }

  console.log(`🗑️  Deletando admin: ${username}`);
  console.log('\n⚠️  Esta ação não pode ser desfeita!');
  console.log('   Você deve executar o SQL manualmente no Supabase:\n');
  console.log(`   DELETE FROM public.admins WHERE username = '${username}';\n`);

  console.log('📖 Passos:');
  console.log('1. Abra https://app.supabase.com');
  console.log('2. Selecione seu projeto');
  console.log('3. Vá para SQL Editor');
  console.log('4. Cole o comando SQL acima');
  console.log('5. Clique em "Run"');
  console.log('\n✅ Pronto! O admin foi removido do banco de dados.');
}

function showHelp() {
  console.log(`
🛠️  Gerenciador de Administradores

Uso: node manage-admins.js [comando] [opções]

Comandos:
  add <username> <password>    Adicionar novo admin
  delete <username>            Remover admin (instruções SQL)
  help                         Mostrar esta mensagem

Exemplos:
  node manage-admins.js add joao senha123
  node manage-admins.js delete joao
  node manage-admins.js help
  `);
}

// Main
if (command === 'add') {
  addAdmin();
} else if (command === 'delete') {
  deleteAdmin();
} else if (command === 'help' || !command) {
  showHelp();
} else {
  console.error(`❌ Comando desconhecido: ${command}`);
  showHelp();
  process.exit(1);
}
