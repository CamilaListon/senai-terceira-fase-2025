import { prismaClient } from "../prisma/prisma";

test("Consulta ao banco retorna um usuário pelo email", async () => {
    const email = String("carlos@gmail.com")
    const usuario = await prismaClient.usuario.findUnique({
        where: { email },  
    });
    const usuarioSolicitado={
        "id": 1
    }

    expect(usuario).toEqual({email});
});