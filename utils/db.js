const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Conexión con manejo de error
db.connect((err) => {
  if (err) {
    console.error("❌ Error al conectar a la base de datos:", err.message);
    process.exit(1); // <- evita que el proceso siga si falla la BD
  } else {
    console.log("✅ Conectado a la base de datos.");
  }
});

module.exports = db;
