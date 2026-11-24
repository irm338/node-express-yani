import { Router } from "express";
import { campers } from "../data/campers.db.js";
import { validarCamper } from "../middlewares/validator.js";

const router = Router();

function parseId(value) {
    if (!/^[1-9]\d*$/.test(value)) {
        return null;
    }

    const id = Number(value);
    return Number.isSafeInteger(id) ? id : null;
}

function sendInvalidId(next) {
    const error = new Error("El parámetro ID debe ser un entero positivo válido.");
    error.statusCode = 400;
    next(error);
}

// Devuelve la colección completa en un formato estable para los clientes.
router.get("/", (req, res) => {
    res.status(200).json({
        total: campers.length,
        datos: campers
    });
});

// Distingue los identificadores inválidos de los campers inexistentes.
router.get("/:id", (req, res, next) => {
    const id = parseId(req.params.id);
    if (id === null) {
        return sendInvalidId(next);
    }

    const camper = campers.find((item) => item.id === id);
    if (!camper) {
        const error = new Error(`No se encontró ningún camper con el ID ${id}.`);
        error.statusCode = 404;
        return next(error);
    }

    res.status(200).json({
        mensaje: "Camper encontrado exitosamente.",
        camper
    });
});

// Valida todos los campos antes de asignar un ID o modificar los datos.
router.post("/", validarCamper, (req, res) => {
    const { nombre, modulo, nivel } = req.body;
    const id = campers.length > 0
        ? Math.max(...campers.map((camper) => camper.id)) + 1
        : 1;
    const camper = {
        id,
        nombre: nombre.trim(),
        modulo: modulo.trim(),
        nivel: nivel.trim()
    };

    campers.push(camper);
    res.status(201).json({
        mensaje: "Camper registrado exitosamente en memoria.",
        camper
    });
});

// PUT reemplaza todos los campos editables; una actualización parcial requeriría PATCH.
router.put("/:id", validarCamper, (req, res, next) => {
    const id = parseId(req.params.id);
    if (id === null) {
        return sendInvalidId(next);
    }

    const index = campers.findIndex((camper) => camper.id === id);
    if (index === -1) {
        const error = new Error(`No es posible actualizar: no existe camper con el ID ${id}.`);
        error.statusCode = 404;
        return next(error);
    }

    const { nombre, modulo, nivel } = req.body;
    campers[index] = {
        id,
        nombre: nombre.trim(),
        modulo: modulo.trim(),
        nivel: nivel.trim()
    };

    res.status(200).json({
        mensaje: `Camper con ID ${id} actualizado exitosamente.`,
        camper: campers[index]
    });
});

// Elimina el registro y lo devuelve para que el cliente confirme el resultado.
router.delete("/:id", (req, res, next) => {
    const id = parseId(req.params.id);
    if (id === null) {
        return sendInvalidId(next);
    }

    const index = campers.findIndex((camper) => camper.id === id);
    if (index === -1) {
        const error = new Error(`No es posible eliminar: no existe camper con el ID ${id}.`);
        error.statusCode = 404;
        return next(error);
    }

    const [camper] = campers.splice(index, 1);
    res.status(200).json({
        mensaje: `Camper con ID ${id} eliminado exitosamente.`,
        camper
    });
});

export default router;
