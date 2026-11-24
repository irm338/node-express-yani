# API REST de Campers

API REST desarrollada con Node.js, Express y ES Modules para administrar campers en memoria. Los cambios se conservan solo mientras el servidor está activo.

## Requisitos

- Node.js 18.11 o superior
- npm

## Instalación y ejecución

```bash
npm install
npm run dev
```

El servidor queda disponible en `http://localhost:3000`. Para iniciarlo sin modo watch:

```bash
npm start
```

Se puede configurar el puerto con la variable de entorno `PORT`.

## Pruebas

```bash
npm test
```

Las pruebas usan el módulo integrado `node:test` y no requieren una base de datos externa.

## Estructura del proyecto

```text
.
├── src/
│   ├── app.js
│   ├── server.js
│   ├── data/
│   │   └── campers.db.js
│   ├── middlewares/
│   │   ├── errorhandler.js
│   │   ├── logger.js
│   │   └── validator.js
│   └── routes/
│       └── campers.routes.js
├── test/
│   └── campers.test.js
├── .gitignore
├── package.json
└── README.md
```

## Endpoints

Todas las respuestas están en JSON. Los campers tienen `id`, `nombre`, `modulo` y `nivel`.

### `GET /`

Devuelve el estado de la API y una lista de endpoints disponibles.

### `GET /api/campers`

Devuelve toda la colección:

```json
{
  "total": 3,
  "datos": [
    {
      "id": 1,
      "nombre": "Valeria Gómez",
      "modulo": "Node.js",
      "nivel": "Intermedio"
    }
  ]
}
```

### `GET /api/campers/:id`

Devuelve un camper, por ejemplo `GET /api/campers/1`. Responde `400` si el ID no es un entero positivo y `404` si no existe.

### `POST /api/campers`

Crea un camper. Los tres campos son obligatorios y deben ser cadenas no vacías:

```bash
curl -X POST http://localhost:3000/api/campers \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Ana Pérez","modulo":"Express","nivel":"Básico"}'
```

Responde `201 Created` con el camper creado; los datos inválidos responden `400 Bad Request`.

### `PUT /api/campers/:id`

Reemplaza todos los campos editables del camper:

```bash
curl -X PUT http://localhost:3000/api/campers/1 \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Ana Pérez","modulo":"Node.js","nivel":"Intermedio"}'
```

Responde `200 OK`, `400 Bad Request` para un ID o cuerpo inválido y `404 Not Found` si el camper no existe.

### `DELETE /api/campers/:id`

Elimina el camper indicado y devuelve el registro eliminado. Responde `200 OK`, `400 Bad Request` para un ID inválido o `404 Not Found` si no existe.

Las rutas no definidas responden `404 Not Found`. Los errores se devuelven con la forma `{ "exito": false, "error": { "codigo": 400, "mensaje": "..." } }`.
