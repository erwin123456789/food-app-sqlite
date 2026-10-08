import * as SQLite from 'expo-sqlite';

// CLO 2.1: open the database
const db = SQLite.openDatabaseSync('pos_inventory.db');

// CLO 2.2: WAL mode + schema
db.execSync('PRAGMA journal_mode = WAL;');
db.execSync(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price REAL NOT NULL,
    stock INTEGER NOT NULL
  );
`);

// CLO 2.3: auto-seed on first launch
const seedIfEmpty = () => {
  const row = db.getFirstSync('SELECT COUNT(*) AS count FROM products');
  if (row.count === 0) {
    const seed = [
      ['Cheeseburger', 'Burgers', 120, 25],
      ['Pepperoni Pizza', 'Pizza', 250, 15],
      ['Chicken Adobo Rice', 'Rice Meals', 140, 30],
      ['Spaghetti', 'Pasta', 110, 20],
      ['Iced Tea', 'Drinks', 45, 50],
      ['Halo-Halo', 'Desserts', 85, 18],
    ];
    seed.forEach(([name, category, price, stock]) =>
      db.runSync(
        'INSERT INTO products (name, category, price, stock) VALUES (?, ?, ?, ?)',
        [name, category, price, stock]
      )
    );
  }
};
seedIfEmpty();

// CLO 2.4 / 2.5: parameterized CRUD
export const getProducts = (search = '') =>
  search.trim()
    ? db.getAllSync(
        'SELECT * FROM products WHERE name LIKE ? ORDER BY name ASC',
        ['%' + search.trim() + '%']
      )
    : db.getAllSync('SELECT * FROM products ORDER BY id DESC');

export const addProduct = (name, category, price, stock) =>
  db.runSync(
    'INSERT INTO products (name, category, price, stock) VALUES (?, ?, ?, ?)',
    [name, category, price, stock]
  );

export const deleteProduct = (id) =>
  db.runSync('DELETE FROM products WHERE id = ?', [id]);

export const changeStock = (id, delta) =>
  db.runSync(
    'UPDATE products SET stock = MAX(stock + ?, 0) WHERE id = ?',
    [delta, id]
  );

export default db;