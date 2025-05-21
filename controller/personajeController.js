const db = require("../utils/db");
const { validationResult } = require("express-validator");

const getPersonajes = (req, res, next) => {
  const { id } = req.params;
  const query = id ? "SELECT * FROM personajes WHERE id = ?" : "SELECT * FROM Personajes";
  const params = id ? [id] : [];

  db.query(query, params, (err, results) => {
    if (err) return next(err);
    if (id && results.length === 0) return res.status(404).json({ error: "Personaje no encontrado" });
    res.json({ data: results });
  });
};

const insertPersonaje = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { nombre, casa, descripcion, rol } = req.body;
  db.query(
    "INSERT INTO Personajes (nombre, casa, descripcion, rol) VALUES (?, ?, ?, ?)",
    [nombre, casa, descripcion, rol],
    (err) => {
      if (err) return next(err);
      res.status(201).json({ message: "Personaje insertado exitosamente" });
    }
  );
};

const updatePersonaje = (req, res, next) => {
  const { id } = req.params;
  const { nombre, casa, descripcion, rol } = req.body;

  const fields = [];
  const values = [];

  if (nombre) { fields.push("nombre = ?"); values.push(nombre); }
  if (casa) { fields.push("casa = ?"); values.push(casa); }
  if (descripcion) { fields.push("descripcion = ?"); values.push(descripcion); }
  if (rol) { fields.push("rol = ?"); values.push(rol); }

  if (fields.length === 0) return res.status(400).json({ error: "No se proporcionaron datos para actualizar" });

  values.push(id);
  db.query(`UPDATE Personajes SET ${fields.join(", ")} WHERE id = ?`, values, (err, results) => {
    if (err) return next(err);
    if (results.affectedRows === 0) return res.status(404).json({ error: "Personaje no encontrado" });
    res.json({ message: "Personaje actualizado correctamente" });
  });
};

const deletePersonaje = (req, res, next) => {
  const { id } = req.params;
  db.query("DELETE FROM Personajes WHERE id = ?", [id], (err, results) => {
    if (err) return next(err);
    if (results.affectedRows === 0) return res.status(404).json({ error: "Personaje no encontrado" });
    res.json({ message: "Personaje eliminado correctamente" });
  });
};

module.exports = {
  getPersonajes,
  insertPersonaje,
  updatePersonaje,
  deletePersonaje,
};