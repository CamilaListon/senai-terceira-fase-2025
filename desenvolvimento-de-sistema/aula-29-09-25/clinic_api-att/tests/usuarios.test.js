const baseUrl = "http://localhost:5000";
import { prismaClient } from "../prisma/prisma";

// -----------------------------
// Exercício 1: GET básico
// -----------------------------
// test("GET /usuarios retorna 200", async () => {
//     const res = await fetch(`${baseUrl}/usuarios`);
//     expect(res.status).toBe(200);
// });

// -----------------------------
// Exercício 1: GET básico
// -----------------------------
// test("Consulta ao banco retorna lista de usuários", async () => {
//     const usuarios = await prismaClient.usuario.findMany();
//     expect(Array.isArray(usuarios)).toBe(true);
// });

// // -----------------------------
// // Exercício 2: Retorna array
// // -----------------------------
// test("GET /usuarios retorna um array", async () => {
//     const res = await fetch(`${baseUrl}/usuarios`);
//     const data = await res.json();
//     expect(Array.isArray(data)).toBe(true);
// });

// // -----------------------------
// // Exercício 3: POST cria usuário
// // -----------------------------
// test("POST /usuarios cria usuário", async () => {
//     const novoUsuario = { nome: "Ana2", email: "ana2@example.com", cargo: "medico", senha: "teste123" };
//     const res = await fetch(`${baseUrl}/usuarios`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(novoUsuario),
//     });
//     const data = await res.json();
//     // expect(data.nome).toBe("Ana2");
//     //TODO: implementar validação de usuário criado
//     await fetch(`${baseUrl}/usuarios/${data.id}`, { method: "DELETE" });
//     const resEmail = await fetch(`${baseUrl}/usuarios/byemail/ana2@example.com`)
//     expect(resEmail.status).toBe(404)
//     // const resDelete = await fetch(`${baseUrl}/users/${data.id}`);
// });


// // -----------------------------
// // Exercício 4: GET usuário específico
// // -----------------------------
// test("GET /usuarios/3 retorna usuário válido", async () => {
//     const res = await fetch(`${baseUrl}/usuarios/3`);
//     const data = await res.json();
//     expect(data).toHaveProperty("id", 3);
// });

// // -----------------------------
// // Exercício 5: PUT atualiza usuário
// // -----------------------------
// test("PUT /usuarios/3 atualiza nome do usuário", async () => {
//     const res = await fetch(`${baseUrl}/usuarios/3`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//             nome: "Thiago Atualizado",
//         }),
//     });
//     const data = await res.json();
//     expect(data.data.nome).toBe("Thiago Atualizado");
// });


// // -----------------------------
// // Exercício 7: DELETE usuário
// // -----------------------------
// test("DELETE /usuarios/1 exclui usuário", async () => {
//     await fetch(`${baseUrl}/usuarios/1`, { method: "DELETE" });
//     const res = await fetch(`${baseUrl}/users/1`);
//     expect(res.status).toBe(404);
//     // TODO: Melhorar para garantir alguma coisa
// });

// // -----------------------------
// // Exercício 8: Validação de usuário inexistente
// // -----------------------------
// test("GET /users/999 retorna 404", async () => {
//     const res = await fetch(`${baseUrl}/users/999`);
//     expect(res.status).toBe(404);
// });

// // -----------------------------
// // Exercício 9: 'Lista não vazia'
// // -----------------------------
// // test("POST cria usuário e lista não está vazia", async () => {
// //     const novoUsuario = { nome: "Carlos", email: "carlos@example.com", cargo: "medico", senha: "teste321" };
// //     await fetch(`${baseUrl}/usuarios`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(novoUsuario),
// //     });
// //     const res = await fetch(`${baseUrl}/usuarios`);
// //     const data = await res.json();
// //     expect(data.length).toBeGreaterThan(0);
// //     // TODO: arrumar o teste, sempre vai retornar uma lista maior que 0 , porque já existe um usuário criado
// // });

// // -----------------------------
// // Exercício 10: Encadeamento completo
// // -----------------------------
// test("Fluxo completo de usuário", async () => {
//     // cria
//     let res = await fetch(`${baseUrl}/usuarios`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//             nome: "Teste Fluxo",
//             email: "fluxo@example.com",
//             cargo: "medico",
//             senha: "medico123"
//         }),
//     });
//     let user = await res.json();

//     // pega
//     res = await fetch(`${baseUrl}/usuarios/${user.id}`);
//     let data = await res.json();
//     expect(data).toHaveProperty("nome", "Teste Fluxo");

//     // deleta
//     await fetch(`${baseUrl}/usuarios/${user.id}`, { method: "DELETE" });
//     res = await fetch(`${baseUrl}/usuarios/${user.id}`);
//     expect(res.status).toBe(404);
// });

// -----------------------------
// Exercício 1: GET básico
// -----------------------------
test("Consulta ao banco retorna lista de usuários", async () => {
    const usuarios = await prismaClient.usuario.findMany();
    expect(Array.isArray(usuarios)).toBe(true);
});

// -----------------------------
// Exercício 2: Retorna array
// -----------------------------
test("Consulta direta retorna array de usuários", async () => {
    const usuarios = await prismaClient.usuario.findMany();
    expect(Array.isArray(usuarios)).toBe(true);
});

// -----------------------------
// Exercício 3: POST cria usuário
// -----------------------------
test("Criação de usuário com Prisma", async () => {
    const email = "ana2@example.com";

    // Cria usuário
    const novoUsuario = await prismaClient.usuario.create({
        data: {
            nome: "Ana2",
            email: "ana@gmail.com",
            cargo: "medico",
            senha: "teste123",
        },
    });

    expect(novoUsuario.nome).toBe("Ana2");

    // Deleta usuário
    await prismaClient.usuario.delete({
        where: { id: novoUsuario.id },
    });

    // Confirma que o usuário foi deletado
    const usuarioExcluido = await prismaClient.usuario.findUnique({
        where: { email },
    });

    expect(usuarioExcluido).toBeNull();
});

// -----------------------------
// Exercício 4: GET usuário específico
// -----------------------------
test("Consulta usuário específico por ID", async () => {
    const usuario = await prismaClient.usuario.findUnique({
        where: { id: 3 },
    });

    expect(usuario).toHaveProperty("id", 3);
});

// -----------------------------
// Exercício 5: PUT atualiza usuário
// -----------------------------
test("Atualiza nome do usuário via Prisma", async () => {
    // Primeiro busca o usuário
    const usuario = await prismaClient.usuario.findUnique({ where: { id: 3 } });

    if (!usuario) {
        throw new Error("Usuário com ID 3 não encontrado.");
    }

    // Atualiza
    const atualizado = await prismaClient.usuario.update({
        where: { id: 3 },
        data: { nome: "Thiago Atualizado" },
    });

    expect(atualizado.nome).toBe("Thiago Atualizado");
});

// -----------------------------
// Exercício 7: DELETE usuário
// -----------------------------
test("Exclui usuário com ID 1", async () => {
    // Verifica se existe
    const existente = await prismaClient.usuario.findUnique({ where: { id: 1 } });
    if (!existente) {
        console.warn("Usuário com ID 1 não existe, pulando deleção.");
        return;
    }

    // Deleta
    await prismaClient.usuario.delete({ where: { id: 1 } });

    // Verifica exclusão
    const usuario = await prismaClient.usuario.findUnique({ where: { id: 1 } });
    expect(usuario).toBeNull();
});

// -----------------------------
// Exercício 8: Validação de usuário inexistente
// -----------------------------
test("Consulta por usuário inexistente retorna null", async () => {
    const usuario = await prismaClient.usuario.findUnique({ where: { id: 999 } });
    expect(usuario).toBeNull();
});

// -----------------------------
// Exercício 9: 'Lista não vazia'
// -----------------------------
test("Criação de usuário garante lista não vazia", async () => {
    const email = "carlos@example.com";

    await prismaClient.usuario.create({
        data: {
            nome: "Carlos",
            email: "carlos@example.com",
            cargo: "medico",
            senha: "teste321",
        },
    });

    const usuarios = await prismaClient.usuario.findMany();
    expect(usuarios.length).toBeGreaterThan(0);

    // Cleanup
    await prismaClient.usuario.delete({ where: { email } });
});

// -----------------------------
// Exercício 10: Encadeamento completo
// -----------------------------
test("Fluxo completo: criar, buscar, excluir", async () => {
    const email = "fluxo@example.com";

    // Cria
    const novo = await prismaClient.usuario.create({
        data: {
            nome: "Teste Fluxo",
            email: "test@teste.com",
            cargo: "medico",
            senha: "medico123",
        },
    });

    expect(novo).toHaveProperty("id");

    // Busca
    const buscado = await prismaClient.usuario.findUnique({
        where: { id: novo.id },
    });
    expect(buscado?.nome).toBe("Teste Fluxo");

    // Deleta
    await prismaClient.usuario.delete({
        where: { id: novo.id },
    });

    const aposDelete = await prismaClient.usuario.findUnique({
        where: { id: novo.id },
    });

    expect(aposDelete).toBeNull();
});
