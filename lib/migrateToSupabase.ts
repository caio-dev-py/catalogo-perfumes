import Database from 'better-sqlite3';
import path from 'path';
import { createCategory, createProduct, createAdmin } from './dbClient';

async function migrate() {
  const dbPath = path.join(process.cwd(), 'data', 'perfumes.db');
  const db = new Database(dbPath, { readonly: true });

  // Migrate categories
  const catStmt = db.prepare('SELECT * FROM categories');
  const categories = catStmt.all() as Array<{ id: number; name: string }>;

  const categoryMap: Record<number, number> = {};

  for (const cat of categories) {
    try {
      const created = await createCategory(cat.name);
      // Supabase may return id in 'id' property
      categoryMap[cat.id] = (created as any).id;
      console.log(`Migrated category ${cat.name} -> ${categoryMap[cat.id]}`);
    } catch (err) {
      console.error('Failed to migrate category', cat.name, err);
    }
  }

  // Migrate products
  const prodStmt = db.prepare('SELECT * FROM products');
  const products = prodStmt.all() as Array<any>;

  for (const p of products) {
    const payload = { ...p };
    // Map category id
    if (p.category_id && categoryMap[p.category_id]) {
      payload.category_id = categoryMap[p.category_id];
    }
    // Remove SQLite-specific fields if necessary
    delete payload.id;
    try {
      const created = await createProduct(payload);
      console.log(`Migrated product ${p.name} -> ${(created as any).id}`);
    } catch (err) {
      console.error('Failed to migrate product', p.name, err);
    }
  }

  // Migrate admins
  const adminStmt = db.prepare('SELECT * FROM admins');
  const admins = adminStmt.all() as Array<{ username: string; password: string }>;

  for (const a of admins) {
    try {
      await createAdmin(a.username, a.password);
      console.log(`Migrated admin ${a.username}`);
    } catch (err) {
      console.error('Failed to migrate admin', a.username, err);
    }
  }

  console.log('Migration finished');
  process.exit(0);
}

migrate().catch((err) => {
  console.error('Migration failed', err);
  process.exit(1);
});
