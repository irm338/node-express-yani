import express from "express";
import { errorHandler } from "./middlewares/errorhandler.js";
import { logger } from "./middlewares/logger.js";
import campersRouter from "./routes/campers.routes.js";

const app = express();

// Registra cada solicitud antes de analizar el cuerpo, incluso si el JSON es inválido.
app.use(logger);
app.use(express.json());

// Expone una comprobación de estado y un resumen de las operaciones disponibles.
app.get("/", (req, res) => {
    res.status(200).json({
        mensaje: "Bienvenido a la API REST de Campers en Express (Campuslands)",
        stack: "Node.js + Express + ECMAScript Modules (ESM)",
        almacenamiento: "Arreglo en memoria (sin base de datos externa)",
        documentacion_endpoints: {
            listar_todos: "GET /api/campers",
            obtener_por_id: "GET /api/campers/:id",
            crear_nuevo: "POST /api/campers",
            actualizar: "PUT /api/campers/:id",
            eliminar: "DELETE /api/campers/:id"
        }
    });
});

app.use("/api/campers", campersRouter);

// Envía las rutas inexistentes al mismo formato centralizado de errores.
app.use((req, res, next) => {
    const error = new Error(`Ruta '${req.method} ${req.originalUrl}' no encontrada.`);
    error.statusCode = 404;
    next(error);
});

// Debe ser el último middleware para capturar errores de rutas y capas anteriores.
app.use(errorHandler);

export default app;
