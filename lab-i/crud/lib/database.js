const path = require('path');
const { DatabaseSync } = require('node:sqlite');

let database;
const databasePath = process.env.CAR_DB_PATH || path.join(__dirname, '..', 'data.db');

function getDatabase() {
  if (!database) {
    database = new DatabaseSync(databasePath);
    database.exec(`
      CREATE TABLE IF NOT EXISTS car (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        manufacturer TEXT NOT NULL,
        model TEXT NOT NULL,
        year INTEGER NOT NULL
      );
    `);
  }

  return database;
}

module.exports = { getDatabase, databasePath };
