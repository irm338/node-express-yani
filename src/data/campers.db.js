
export let campers = [
    { id: 1, nombre: "Valeria Gómez", modulo: "Node.js", nivel: "Intermedio" },
    { id: 2, nombre: "Carlos Morales", modulo: "JavaScript", nivel: "Básico" },
    { id: 3, nombre: "Diana Ruiz", modulo: "Express", nivel: "Avanzado" }
];

/**
 * Función auxiliar para restablecer los datos iniciales (útil para
 * pruebas y demostraciones).
 */
export function reiniciarCampers() {
    campers = [
        { id: 1, nombre: "Valeria Gómez", modulo: "Node.js", nivel:
        "Intermedio" },
        { id: 2, nombre: "Carlos Morales", modulo: "JavaScript", nivel:
        "Básico" },
        { id: 3, nombre: "Diana Ruiz", modulo: "Express", nivel: "Avanzado" }
    ];
    return campers;
}
