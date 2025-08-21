import express from 'express';
import { prismaClient } from '../prisma/prisma.js';

const app = express()
app.use(express.json())

app.get('/usuarios', async (request, response) => {
    try {
        const usuarios = await prismaClient.usuario.findMany();
        return response.json(usuarios)
    }
    catch (e) {
        console.log(e)
    }
});

app.get("/usuarios/:id", async (request, response) => {
    try {
        const usuario = await prismaClient.usuario.findUnique({
            where: {
                id: Number(request.params.id)
            }
        })
        if (!usuario) return response.status(404).json("Usuario não existe")
        return response.json(usuario)
    }
    catch (e) {
        console.log(e)
    }
});

app.post("/usuarios", async (req, res) => {
    try {
        const { body } = req
        const usuario = await prismaClient.usuario.create({
            data: {
                nome: body.nome,
                cargo: body.cargo,
                email: body.email,
                senha: body.senha
            },
        })
        return res.status(201).json(usuario)
    } catch (error) {
        console.error(error)
        if (error.code === "P2002") {
            res.status(404).send("Falha ao cadastrar usuário: Email já cadastrado!")
        }
    }
})

app.put("/usuarios/:id", async (req, res) => {
    try {
        const { body, params } = req
        if (body.nome || body.cargo || body.email || body.senha) {
            await prismaClient.usuario.update({
                where: { id: Number(params.id) },
                data: {
                    ...body
                },
            })

            const usuarioAtualizado = await prismaClient.usuario.findUnique({
                where: {
                    id: Number(params.id)
                }
            })

            res.status(201).json({
                message: "Usuário atualizado!",
                data: usuarioAtualizado
            })
        } else {
            res.status(404).send("Atributos enviados não condizem com o schema")
        }
    } catch (error) {
        if (error.code == "P2025") {
            res.status(404).send("Usuário não existe no banco")
        }
        if (error.code === "P2002") {
            res.status(404).send("Falha ao cadastrar usuário: Email já cadastrado!")
        }
    }
})

app.delete("/usuarios/:id", async (req, res) => {
    const { params } = req
    try {
        const usuarioDeletado = await prismaClient.usuario.delete({
            where: {
                id: Number(params.id),
            },
        })
        res.status(200).json({
            message: "Usuário deletado!",
            data: usuarioDeletado
        })
    } catch (error) {
        console.log(error)
        if (error.code == "P2025") {
            res.status(404).send("Usuário não existe no banco")
        }
    }
})

app.get('/pacientes', async (request, response) => {
    try {
        const pacientes = await prismaClient.paciente.findMany();
        return response.json(pacientes);
    } catch (e) {
        console.log(e);
        response.status(500).json({ error: 'Erro ao buscar pacientes.' });
    }
});

app.get("/pacientes/:id", async (request, response) => {
    try {
        const paciente = await prismaClient.paciente.findUnique({
            where: {
                id: Number(request.params.id),
            },
        });
        if (!paciente) return response.status(404).json("Paciente não encontrado.");
        return response.json(paciente);
    } catch (e) {
        console.log(e);
        response.status(500).json({ error: 'Erro ao buscar o paciente.' });
    }
});

app.post("/pacientes", async (req, res) => {
    try {
        const { body } = req;
        const paciente = await prismaClient.paciente.create({
            data: {
                nome: body.nome,
                cpf: body.cpf,
                telefone: body.telefone,
                email: body.email,
                data_nascimento: new Date(body.data_nascimento),
                sexo: body.sexo,
            },
        });
        return res.status(201).json(paciente);
    } catch (error) {
        console.error(error);
        if (error.code === "P2002") {
            return res.status(400).send("Falha ao cadastrar paciente: CPF ou email já cadastrados.");
        }
        res.status(500).send("Erro ao cadastrar paciente.");
    }
});

app.put("/pacientes/:id", async (req, res) => {
    try {
        const { body, params } = req;
        const paciente = await prismaClient.paciente.update({
            where: { id: Number(params.id) },
            data: {
                nome: body.nome || undefined,
                cpf: body.cpf || undefined,
                telefone: body.telefone || undefined,
                email: body.email || undefined,
                data_nascimento: body.data_nascimento ? new Date(body.data_nascimento) : undefined,
                sexo: body.sexo || undefined,
            },
        });

        res.status(200).json({
            message: "Paciente atualizado!",
            data: paciente,
        });
    } catch (error) {
        if (error.code == "P2025") {
            return res.status(404).send("Paciente não encontrado.");
        }
        if (error.code === "P2002") {
            return res.status(400).send("Falha ao atualizar paciente: CPF ou email já cadastrados.");
        }
        res.status(500).send("Erro ao atualizar paciente.");
    }
});

app.delete("/pacientes/:id", async (req, res) => {
    const { params } = req;
    try {
        const pacienteDeletado = await prismaClient.paciente.delete({
            where: {
                id: Number(params.id),
            },
        });
        res.status(200).json({
            message: "Paciente deletado!",
            data: pacienteDeletado,
        });
    } catch (error) {
        console.log(error);
        if (error.code == "P2025") {
            return res.status(404).send("Paciente não encontrado.");
        }
        res.status(500).send("Erro ao deletar paciente.");
    }
});

//----------------------------------------

app.get('/exames', async (request, response) => {
    try {
        const exames = await prismaClient.exame.findMany({
            include: {
                paciente: true 
            }
        });
        return response.json(exames);
    } catch (e) {
        console.log(e);
        response.status(500).json({ error: 'Erro ao buscar exames.' });
    }
});

app.get('/exames/:id', async (request, response) => {
    try {
        const exame = await prismaClient.exame.findUnique({
            where: {
                id: Number(request.params.id),
            },
            include: {
                paciente: true 
            }
        });
        if (!exame) return response.status(404).json("Exame não encontrado.");
        return response.json(exame);
    } catch (e) {
        console.log(e);
        response.status(500).json({ error: 'Erro ao buscar o exame.' });
    }
});

app.post('/exames', async (req, res) => {
    try {
        const { body } = req;
        const exame = await prismaClient.exame.create({
            data: {
                tipo_exame: body.tipo_exame,
                resultado: body.resultado,
                data_exame: new Date(body.data_exame),
                link_arquivo: body.link_arquivo,
                observacoes: body.observacoes,
                paciente_id: body.paciente_id, 
            },
        });
        return res.status(201).json(exame);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erro ao cadastrar exame.");
    }
});

app.put('/exames/:id', async (req, res) => {
    try {
        const { body, params } = req;
        const exame = await prismaClient.exame.update({
            where: { id: Number(params.id) },
            data: {
                tipo_exame: body.tipo_exame || undefined,
                resultado: body.resultado || undefined,
                data_exame: body.data_exame ? new Date(body.data_exame) : undefined,
                link_arquivo: body.link_arquivo || undefined,
                observacoes: body.observacoes || undefined,
                paciente_id: body.paciente_id || undefined, 
            },
        });
        res.status(200).json({
            message: "Exame atualizado!",
            data: exame,
        });
    } catch (error) {
        if (error.code == "P2025") {
            return res.status(404).send("Exame não encontrado.");
        }
        res.status(500).send("Erro ao atualizar exame.");
    }
});

app.delete('/exames/:id', async (req, res) => {
    const { params } = req;
    try {
        const exameDeletado = await prismaClient.exame.delete({
            where: {
                id: Number(params.id),
            },
        });
        res.status(200).json({
            message: "Exame deletado!",
            data: exameDeletado,
        });
    } catch (error) {
        console.log(error);
        if (error.code == "P2025") {
            return res.status(404).send("Exame não encontrado.");
        }
        res.status(500).send("Erro ao deletar exame.");
    }
});


app.listen(3000, () => console.log("Api rodandos"))