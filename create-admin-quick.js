#!/usr/bin/env node

import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Configuração para carregar o .env.local da raiz do projeto
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, './.env.local') });

// Agora pegamos a secret direto do ambiente (process.env)
const secret = process.env.ADMIN_SECRET_KEY;
const username = process.argv[2];
const password = process.argv[3];

// Validação de segurança e UX
if (!secret) {
  console.log('\x1b[31m%s\x1b[0m', '\n[ERRO] ADMIN_SECRET_KEY não encontrada no seu .env.local');
  process.exit(1);
}

if (!username || !password) {
  console.log('\x1b[33m%s\x1b[0m', '\nUso: node create-admin-quick.js <username> <password>');
  process.exit(1);
}

const data = JSON.stringify({ username, password, secret: secret.trim() });
const dataBuffer = Buffer.from(data);

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/admin/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': dataBuffer.length
  }
};

console.log('\x1b[36m%s\x1b[0m', `\n[*] Usando Secret Key do .env.local para criar: ${username}...`);

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    const result = JSON.parse(body);
    if (res.statusCode === 201 || res.statusCode === 200) {
      console.log('\x1b[32m%s\x1b[0m', '\n[OK] Admin criado com sucesso usando a chave do ambiente!');
    } else {
      console.error('\x1b[31m%s\x1b[0m', `\n[ERRO ${res.statusCode}]`, result.error || result);
    }
  });
});

req.on('error', (e) => console.error('\n[ERRO] Servidor offline:', e.message));
req.write(dataBuffer);
req.end();