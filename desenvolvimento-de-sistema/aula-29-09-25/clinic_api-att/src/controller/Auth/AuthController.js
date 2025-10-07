import bcrypt from "bcrypt";
import { prismaClient } from "../../prisma/prisma.ts";
import {
    signAccessToken,
    signRefreshToken,
    verifyRefresh,
} from "../utils/jwt.ts";


class AuthController {
    constructor() { }

    async register(req, res) {
        try {
            const { nome, email, senha, cargo } = req.body;

            if (!nome || !email || !senha || !cargo) {
                return res.status(400).json({ error: "Nome, email, senha e cargo são obrigatórios" });
            }

            const existingUsuario = await prismaClient.usuario.findUnique({ where: { email } });
            if (existingUsuario) {
                return res.status(409).json({ error: "Usuário já existe" });
            }

            const saltRounds = 10;
            const hashedSenha = await bcrypt.hash(senha, saltRounds);

            const usuario = await prismaClient.usuario.create({
                data: { nome, email, senha: hashedSenha, cargo },
                select: { id: true, nome: true, email: true, cargo: true },
            });

            return res.status(201).json(usuario);
        } catch (error) {
            console.error("Erro no registro:", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    async login(req, res) {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({ error: "Email e senha são obrigatórios" });
            }

            const usuario = await prismaClient.usuario.findUnique({ where: { email } });

            if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
                return res.status(401).json({ error: "Credenciais inválidas" });
            }

            const accessToken = signAccessToken({
                userId: usuario.id,
                email: usuario.email,
                nome: usuario.nome,
                cargo: usuario.cargo,
            });

            const refreshToken = signRefreshToken({
                userId: usuario.id,
                email: usuario.email,
                nome: usuario.nome,
                cargo: usuario.cargo,
            });

            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 7);

            // Remove tokens antigos antes de criar um novo
            await prismaClient.token.deleteMany({
                where: { userId: usuario.id, type: "refresh" },
            });

            await prismaClient.token.create({
                data: {
                    token: refreshToken,
                    type: "refresh",
                    userId: usuario.id,
                    expiresAt,
                },
            });

            return res.status(200).json({
                accessToken,
                refreshToken,
                usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, cargo: usuario.cargo },
            });
        } catch (error) {
            console.error("Erro no login:", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }

    async logout(req, res) {
        try {
            const { refreshToken } = req.body;

            if (!refreshToken) {
                return res.status(400).json({ error: "Refresh token é obrigatório" });
            }

            const storedToken = await prismaClient.token.findFirst({
                where: { token: refreshToken, type: "refresh" },
            });

            if (
                !storedToken ||
                storedToken.revoked ||
                storedToken.expiresAt < new Date()
            ) {
                return res.status(401).json({ error: "Token inválido ou expirado" });
            }

            await prismaClient.token.update({
                where: { id: storedToken.id },
                data: { revoked: true },
            });

            return res.status(200).json({ message: "Usuário deslogado com sucesso" });
        } catch (error) {
            console.error("Erro no logout:", error);
            return res.status(500).json({ error: "Erro interno do servidor" });
        }
    }
}

export const authController = new AuthController();