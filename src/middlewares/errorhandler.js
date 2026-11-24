export function errorHandler(err, req, res, next) {
    const status = Number(err.statusCode || err.status);
    const statusCode = Number.isInteger(status) && status >= 400 && status <= 599
        ? status
        : 500;
    const isClientError = statusCode < 500;
    const message = err.type === "entity.parse.failed"
        ? "El cuerpo JSON no es válido."
        : isClientError
            ? err.message
            : "Ocurrió un error interno en el servidor.";

    // Registra los detalles internos sin exponerlos en la respuesta al cliente.
    if (!isClientError) {
        console.error("[ERROR GLOBAL CAPTURADO]:", err);
    }

    res.status(statusCode).json({
        exito: false,
        error: {
            codigo: statusCode,
            mensaje: message
        }
    });
}

