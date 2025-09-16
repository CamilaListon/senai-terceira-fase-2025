import jsonServer from "json-server";

const baseUrl = "http://localhost:4000";
let server;

beforeAll((done) => {
    const app = jsonServer.create();
    const router = jsonServer.router("db.json");
    const middlewares = jsonServer.defaults();

    app.use(middlewares);
    app.use(router);

    server = app.listen(4000, done);
});

afterAll((done) => {
    server.close(done);
});


// GET /equipamentos
test("GET /equipamentos retorna 200 e um array", async () => {
    const res = await fetch(`${baseUrl}/equipamentos`);
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data).toBeDefined();
    if (data.length > 0) {
        expect(data[0]).toHaveProperty("id");
        expect(data[0]).toHaveProperty("nome");
        expect(data[0]).toHaveProperty("status");
    }
});


// POST /equipamentos
test("POST /equipamentos cria novo equipamento", async () => {
    const novoEquip = {
        nome: "Impressora 3D",
        status: "ativo",
    };

    const res = await fetch(`${baseUrl}/equipamentos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoEquip),
    });

    expect(res.status).toBe(201);
    const data = await res.json();

    expect(data).toBeDefined();
    expect(data).toHaveProperty("id");
    expect(data.nome).toBe("Impressora 3D");
    expect(data.status).toMatch(/ativo/);
    expect(data.id).toBeGreaterThan(0);

    await fetch(`${baseUrl}/equipamentos/${data.id}`, { method: "DELETE" });
});


// GET /equipamentos/:id
test("GET /equipamentos/:id retorna equipamento válido", async () => {
    const resPost = await fetch(`${baseUrl}/equipamentos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: "Scanner", status: "ativo" }),
    });
    const equipamento = await resPost.json();

    const res = await fetch(`${baseUrl}/equipamentos/${equipamento.id}`);
    expect(res.status).toBe(200);
    const data = await res.json();

    expect(data).toMatchObject({
        id: equipamento.id,
        nome: "Scanner",
        status: "ativo",
    });

    await fetch(`${baseUrl}/equipamentos/${equipamento.id}`, { method: "DELETE" });
});


// PUT /equipamentos/:id
test("PUT /equipamentos/:id atualiza equipamento", async () => {
    const resPost = await fetch(`${baseUrl}/equipamentos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: "Notebook", status: "ativo" }),
    });
    const equipamento = await resPost.json();

    const atualizadoEquip = {
        id: equipamento.id,
        nome: "Notebook Atualizado",
        status: "inativo",
    };

    const resPut = await fetch(`${baseUrl}/equipamentos/${equipamento.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(atualizadoEquip),
    });

    const atualizado = await resPut.json();
    expect(atualizado).toMatchObject(atualizadoEquip);
    expect(atualizado.nome).toMatch(/Atualizado/);
    expect(atualizado.status).toBe("inativo");

    await fetch(`${baseUrl}/equipamentos/${equipamento.id}`, { method: "DELETE" });
});


// PATCH /equipamentos/:id
test("PATCH /equipamentos/:id atualiza status", async () => {
    const resPost = await fetch(`${baseUrl}/equipamentos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: "Servidor", status: "ativo" }),
    });
    const equipamento = await resPost.json();

    const novoStatus = "manutenção";
    const resPatch = await fetch(`${baseUrl}/equipamentos/${equipamento.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: novoStatus }),
    });

    const data = await resPatch.json();
    expect(data.status).toBe(novoStatus);
    expect(data.status).toMatch(/manutenção/);

    await fetch(`${baseUrl}/equipamentos/${equipamento.id}`, { method: "DELETE" });
});


// DELETE /equipamentos/:id
test("DELETE /equipamentos/:id remove equipamento", async () => {
    const resPost = await fetch(`${baseUrl}/equipamentos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: "Roteador", status: "ativo" }),
    });
    const equipamento = await resPost.json();

    const resDel = await fetch(`${baseUrl}/equipamentos/${equipamento.id}`, {
        method: "DELETE",
    });
    expect(resDel.status).toBe(200);

    const res = await fetch(`${baseUrl}/equipamentos/${equipamento.id}`);
    expect(res.status).toBe(404);
});


// GET equipamento inexistente
test("GET /equipamentos/99999 retorna 404", async () => {
    const res = await fetch(`${baseUrl}/equipamentos/99999`);
    expect(res.status).toBe(404);
});


// PUT equipamento inexistente
test("PUT /equipamentos/99999 retorna 404", async () => {
    const res = await fetch(`${baseUrl}/equipamentos/99999`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: 99999, nome: "Teste", status: "ativo" }),
    });

    expect(res.status).toBe(404);
});

// Tentativa Buscar ID inexistente 
test("GET /equipamentos/:id inexistente retorna 404", async () => {
    const res = await fetch(`${baseUrl}/equipamentos/99999`);
    expect(res.status).toBe(404);
});

