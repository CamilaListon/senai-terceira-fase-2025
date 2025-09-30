import { prismaClient } from "../prisma/prisma";

test("Consulta ao banco retorna lista de usuários", async () => {
    const data ={
        nome: "Carlos",
        cargo: "Médico",
        email: "carlos@gmail.com",
        senha: "teste123",
    }

    const usuario = await prismaClient.usuario.create({
        data: data,
    })
    expect(test).toMatchObject(usuario);

})