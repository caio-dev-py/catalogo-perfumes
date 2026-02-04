const Database = require('better-sqlite3');
const db = new Database('./data/perfumes.db');

try {
  const admins = db.prepare('SELECT username, password FROM admins').all();
  console.log('\n✓ Admins no banco de dados:\n');
  if (admins.length === 0) {
    console.log('Nenhum admin encontrado');
  } else {
    admins.forEach((a, i) => {
      console.log(`${i + 1}. Username: ${a.username}`);
      console.log(`   Password: ${a.password}\n`);
    });
  }
} catch (e) {
  console.error('Erro:', e.message);
} finally {
  db.close();
}
