require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const xmlparser = require("express-xml-bodyparser");
const personajeRoutes = require("./routes/personajeRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/swagger.json");
const { errorHandler } = require("./middleware/errorHandler");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(xmlparser());

app.use("/personajes", personajeRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

const PORT = process.env.DB_PORT;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
