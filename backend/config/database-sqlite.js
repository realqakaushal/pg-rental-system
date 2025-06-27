const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath =
  process.env.NODE_ENV === "production"
    ? process.env.DB_PATH || "./pg_rental.db"
    : path.join(__dirname, "..", "pg_rental.db");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err);
  } else {
    console.log("Connected to SQLite database");
  }
});

const query = (text, params = []) => {
  return new Promise((resolve, reject) => {
    // Remove extra whitespace from query
    const cleanQuery = text.trim().replace(/\s+/g, " ");

    if (
      cleanQuery.toUpperCase().startsWith("SELECT") ||
      cleanQuery.toUpperCase().startsWith("WITH")
    ) {
      db.all(cleanQuery, params, (err, rows) => {
        if (err) {
          console.error("SQLite query error:", err);
          reject(err);
        } else {
          resolve({ rows });
        }
      });
    } else {
      db.run(cleanQuery, params, function (err) {
        if (err) reject(err);
        else {
          if (cleanQuery.toUpperCase().includes("INSERT")) {
            db.get("SELECT last_insert_rowid() as id", (err, row) => {
              if (err) reject(err);
              else resolve({ rows: [{ id: row.id }] });
            });
          } else if (
            cleanQuery.toUpperCase().includes("UPDATE") ||
            cleanQuery.toUpperCase().includes("DELETE")
          ) {
            resolve({ rows: [], rowCount: this.changes });
          } else {
            resolve({ rows: [] });
          }
        }
      });
    }
  });
};

module.exports = {
  query,
  db,
};
