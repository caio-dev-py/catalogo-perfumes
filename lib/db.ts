import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'perfumes.db');
let db: Database.Database | null = null;

export function getDb() {
  if (!db) {
    db = new Database(dbPath);
    db.pragma('journal_mode = WAL');
    initializeDatabase();
  }
  return db;
}

export function initializeDatabase() {
  const database = getDb();

  // Create categories table
  database.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create products table
  database.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      brand TEXT NOT NULL,
      price REAL NOT NULL,
      volume_ml INTEGER NOT NULL,
      description TEXT,
      short_description TEXT,
      olfactory_notes TEXT,
      category_id INTEGER NOT NULL,
      image_url TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    )
  `);

  // Create admins table
  database.exec(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Insert default categories
  const stmt = database.prepare('SELECT COUNT(*) as count FROM categories');
  const result = stmt.get() as { count: number };
  
  if (result.count === 0) {
    const insertCategory = database.prepare('INSERT INTO categories (name) VALUES (?)');
    const categories = [
      'Perfumes Masculinos',
      'Perfumes Femininos',
      'Perfumes Unissex',
      'Importados',
      'Nacionais',
      'Árabes'
    ];
    categories.forEach(cat => insertCategory.run(cat));
  }
}

export function closeDb() {
  if (db) {
    db.close();
    db = null;
  }
}
