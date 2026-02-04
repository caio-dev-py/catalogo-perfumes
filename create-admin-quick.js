#!/usr/bin/env node

const http = require('http');

const data = JSON.stringify({
  username: 'caio_araujo',
  password: '123456',
  secret: 'Admin@2024#Perfumes$Secure!Key123'
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/admin/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  
  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });
  
  res.on('end', () => {
    try {
      const result = JSON.parse(body);
      console.log('Resposta:', result);
      
      if (res.statusCode === 201) {
        console.log('\n✓ Conta de admin criada com sucesso!');
        console.log('Username: caio_araujo');
        console.log('Password: 123456');
        console.log('\nVocê pode fazer login em: http://localhost:3000/admin/login');
      }
    } catch (e) {
      console.log('Resposta bruta:', body);
    }
  });
});

req.on('error', (e) => {
  console.error('Erro:', e.message);
  process.exit(1);
});

req.write(data);
req.end();
