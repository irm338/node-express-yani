export function validarCamper(req, res, next) {
    // Centraliza las respuestas de validación en el manejador global de errores.
    if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
        const error = new Error("Se requiere un cuerpo JSON válido en la petición.");
        error.statusCode = 400;
        return next(error);
    }

    // Requiere cadenas no vacías antes de modificar el almacenamiento.
    for (const field of ["nombre", "modulo", "nivel"]) {
        const value = req.body[field];
        if (typeof value !== "string" || value.trim().length === 0) {
            const error = new Error(
                `El campo '${field}' es obligatorio y debe ser una cadena de texto no vacía.`
            );
            error.statusCode = 400;
            return next(error);
        }
    }

    next();
}
