const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.NAME,
  port: process.env.DB_PORT || 3306
});

db.connect((err) => {
  if (err) {
    console.error("❌ Error al conectar a la base de datos:", err.message);
    return;
  }
  console.log("✅ Conexión a la base de datos exitosa");
});

module.exports = db;
