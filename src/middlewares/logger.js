export function logger(req, res, next) {
    const timestamp = new Date().toISOString();

    // originalUrl conserva el prefijo completo de las rutas montadas.
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl || req.url}`);

    next();
}
