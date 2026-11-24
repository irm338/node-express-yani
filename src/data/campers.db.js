
// In-memory data store used by the API; changes are reset when the process stops.
export let campers = [
    { id: 1, nombre: "Valeria Gómez", modulo: "Node.js", nivel: "Intermedio" },
    { id: 2, nombre: "Carlos Morales", modulo: "JavaScript", nivel: "Básico" },
    { id: 3, nombre: "Diana Ruiz", modulo: "Express", nivel: "Avanzado" }
];

// Restore the initial dataset so tests and demonstrations start consistently.
export function reiniciarCampers() {
    campers = [
        { id: 1, nombre: "Valeria Gómez", modulo: "Node.js", nivel: "Intermedio" },
        { id: 2, nombre: "Carlos Morales", modulo: "JavaScript", nivel: "Básico" },
        { id: 3, nombre: "Diana Ruiz", modulo: "Express", nivel: "Avanzado" }
    ];
    return campers;
}
