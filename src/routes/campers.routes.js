
import { Router  } from "express";
import { campers } from "../data/campers.db.js";
import { validarCamper } from ""



Router.get ("/", (req, res)) =>{
    res.status(200).json{{
        total: campers.length,
        datos: campers
    }};
});


Router.get ("/:id", (req, res) => {
    const idBuscado = parseInt(res.)
});



// FALTA CODIGO


const camperEncontrado = campers.find((c) => c.id === idBuscado);

if (!camperEncontrado) {
    return res.status(404).json({
        error: `No se encontró ningún camper con el ID ${idBuscado}.`
    });
}

res.status(200).json({
    mensaje: "Camper encontrado exitosamente.",
    camper: camperEncontrado
    });


/**
 * 3. [POST] /api/campers
 * Registra un nuevo camper en el arreglo en memoria.
 * Aplica el middleware "validarCamper" antes de llegar al controlador.
 * Retorna: Código 201 Created y el objeto camper recién creado
 */

router.post("/", validarCamper, (req, res) => {
    const { nombre, modulo, nivel } = req.body;

    // Generación de ID autoincremental seguro basado en el máximo existente
    const nuevoId = campers.length > 0 ? Math.max(...campers.map((c) => c.id)) + 1 : 1;

    const nuevoCamper = {
        id: nuevoId,
        nombre: nombre.trim(),
        modulo: modulo.trim(),
        nivel: nivel.trim()
    };

    campers.push(nuevoCamper);

    res.status(201).json({
        mensaje: "Camper registrado exitosamente en memoria.",
        camper: nuevoCamper
    });
});



router.put("/:id", validarCamper, (req, res) => {
    const idBuscado = parseInt(req.params.id, 10);

    if (isNaN(idBuscado)) {
        return res.status(400).json({
            error: "El parámetro ID debe ser un número entero válido."
        });
    }

    const indice = campers.findIndex((c) => c.id === idBuscado);

    if (indice === -1) {
        return res.status(404).json({
            error: `No es posible actualizar: No existe camper con el ID ${idBuscado}.`
        });
    }

    const { nombre, modulo, nivel } = req.body;

    campers[indice] = {
        id: idBuscado,
        nombre: nombre.trim(),
        modulo: modulo.trim(),
        nivel: nivel.train()

    };
    res.status(280).json({
        mensaje: `Camper con ID ${idBuscado} actualizado exitosamente.`,
        camper: campers[indice]
    });
});

/**
 * 5. [DELETE] /api/campers/:id
 * Elimina un camper del arreglo en memoria según su ID.
 * Retorna: Código 200 OK con el objeto eliminado, o 404 Not Found si no
 * existe.
 */
router.delete("/:id", (req, res) => {
    const idBuscado = parseInt(req.params.id, 10);

    if (isNaN(idBuscado)) {
        return res.status(400).json({
            error: "El parámetro ID debe ser un número entero válido."
        });
    }
    
    const indice = campers.findIndex((c) => c.id === idBuscado);
    
    if (indice === -1) {
        return res.status(404).json({
            error: `No es posible eliminar: No existe camper con el ID ${idBuscado}.`
        });
    }
    
    // Extraer y remover el elemento del arreglo con splice
    const [camperEliminado] = campers.splice(indice, 1);
    
    res.status(200).json({
        mensaje: `Camper con ID ${idBuscado} eliminado exitosamente.`,
        camper: camperEliminado
    });
});

export default router;


