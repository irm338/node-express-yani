import app from "./app.js";

const port = Number(process.env.PORT) || 3000;

// Separa el arranque del servidor para que las pruebas importen la app sin abrir un puerto fijo.
app.listen(port, () => {
    console.log(`API de campers escuchando en http://localhost:${port}`);
});
