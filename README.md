
 API REST de Campers en Express (Campuslands)

API REST desarrollada con **Node.js**, **Express** y **ES Modules (ESM)** para la gestión de campers en memoria, implementando middlewares personalizados, manejo modular de rutas y control global de errores.

---

##  Estructura del Proyecto

```text
campuslands-express-crud/
├── src/
│   ├── data/
│   │   └── campers.db.js
│   ├── middlewares/
│   │   ├── errorhandler.js
│   │   ├── logger.js
│   │   └── validator.js
│   ├── routes/
│   │   └── campers.routes.js
│   └── app.js
├── package.json
└── README.md


## Requisitos Previos

Node.js (versión 18 o superior recomendada)

npm


## Instalación y Configuración
Clona el repositorio o abre la carpeta del proyecto en tu terminal.

Instala las dependencias necesarias:

Bash


npm install

## Ejecución del Servidor
Modo Desarrollo (con recarga automática):

Bash


npm run dev
Modo Producción:

Bash


npm start

