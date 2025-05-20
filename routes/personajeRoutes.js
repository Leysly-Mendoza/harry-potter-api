const express = require("express");
const router = express.Router();
const controller = require("../controller/personajeController");
const { body } = require("express-validator");

router.get("/", controller.getPersonajes);
router.get("/:id", controller.getPersonajes);
router.post("/", [
  body("nombre").notEmpty().withMessage("Nombre requerido"),
  body("casa").notEmpty().withMessage("Casa requerida"),
  body("descripcion").notEmpty().withMessage("Descripción requerida"),
  body("rol").notEmpty().withMessage("Rol requerido"),
], controller.insertPersonaje);
router.patch("/:id", controller.updatePersonaje);
router.delete("/:id", controller.deletePersonaje);

module.exports = router;