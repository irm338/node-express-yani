import assert from "node:assert/strict";
import { once } from "node:events";
import { afterEach, beforeEach, test } from "node:test";
import app from "../src/app.js";
import { reiniciarCampers } from "../src/data/campers.db.js";

let server;
let baseUrl;

beforeEach(async () => {
    // Cada prueba comienza con datos limpios y un servidor en un puerto libre.
    reiniciarCampers();
    server = app.listen(0);
    await once(server, "listening");
    baseUrl = `http://127.0.0.1:${server.address().port}`;
});

afterEach(async () => {
    await new Promise((resolve, reject) => {
        server.close((error) => error ? reject(error) : resolve());
    });
});

async function request(path, options) {
    return fetch(`${baseUrl}${path}`, options);
}

function jsonOptions(method, body) {
    return {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    };
}

test("serves the health check and the initial camper collection", async () => {
    const health = await request("/");
    assert.equal(health.status, 200);
    assert.match((await health.json()).mensaje, /API REST de Campers/);

    const response = await request("/api/campers");
    const body = await response.json();
    assert.equal(response.status, 200);
    assert.equal(body.total, 3);
    assert.equal(body.datos[0].id, 1);
});

test("reads a camper and reports invalid or unknown IDs", async () => {
    const found = await request("/api/campers/1");
    assert.equal(found.status, 200);
    assert.equal((await found.json()).camper.nombre, "Valeria Gómez");

    const invalid = await request("/api/campers/0");
    assert.equal(invalid.status, 400);
    assert.equal((await invalid.json()).error.codigo, 400);

    const invalidFormat = await request("/api/campers/not-an-id");
    assert.equal(invalidFormat.status, 400);

    const missing = await request("/api/campers/99");
    assert.equal(missing.status, 404);
});

test("creates, updates, and deletes a camper", async () => {
    const camper = { nombre: "Ana Pérez", modulo: "Express", nivel: "Básico" };
    const created = await request("/api/campers", jsonOptions("POST", camper));
    const createdBody = await created.json();
    assert.equal(created.status, 201);
    assert.equal(createdBody.camper.id, 4);

    const updated = await request(
        `/api/campers/${createdBody.camper.id}`,
        jsonOptions("PUT", { ...camper, nivel: "Avanzado" })
    );
    assert.equal(updated.status, 200);
    assert.equal((await updated.json()).camper.nivel, "Avanzado");

    const deleted = await request(`/api/campers/${createdBody.camper.id}`, {
        method: "DELETE"
    });
    assert.equal(deleted.status, 200);
    assert.equal((await deleted.json()).camper.nombre, camper.nombre);
});

test("rejects invalid create and update bodies without changing data", async () => {
    const invalidCreate = await request(
        "/api/campers",
        jsonOptions("POST", { nombre: " ", modulo: "Express", nivel: "Básico" })
    );
    assert.equal(invalidCreate.status, 400);
    assert.equal((await invalidCreate.json()).error.codigo, 400);

    const invalidUpdate = await request(
        "/api/campers/1",
        jsonOptions("PUT", { nombre: "Ana", modulo: 12, nivel: "Básico" })
    );
    assert.equal(invalidUpdate.status, 400);

    const invalidUpdateId = await request(
        "/api/campers/not-an-id",
        jsonOptions("PUT", { nombre: "Ana", modulo: "Node.js", nivel: "Básico" })
    );
    assert.equal(invalidUpdateId.status, 400);

    const collection = await request("/api/campers");
    assert.equal((await collection.json()).total, 3);
});

test("centralizes malformed JSON, missing records, and unknown routes", async () => {
    const malformed = await request("/api/campers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{"
    });
    assert.equal(malformed.status, 400);
    assert.equal((await malformed.json()).error.mensaje, "El cuerpo JSON no es válido.");

    const updateMissing = await request(
        "/api/campers/99",
        jsonOptions("PUT", { nombre: "Ana", modulo: "Node.js", nivel: "Básico" })
    );
    assert.equal(updateMissing.status, 404);

    const deleteMissing = await request("/api/campers/99", { method: "DELETE" });
    assert.equal(deleteMissing.status, 404);

    const deleteInvalidId = await request("/api/campers/1.5", { method: "DELETE" });
    assert.equal(deleteInvalidId.status, 400);

    const unknownRoute = await request("/not-found");
    assert.equal(unknownRoute.status, 404);
    assert.equal((await unknownRoute.json()).error.codigo, 404);
});
