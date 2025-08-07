import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
    await prisma.usuario.createMany({
        data:[
            {   nome: "Joao",
                email: "455@email.com",  
                senha: "123",
                cargo: "Médico"
            },
        ],
    });

    await prisma.paciente.create({
        data: {

            nome:"Joao",
            sexo: "Masculino",
            data_nascimento: new Date ("1980-12-11"),
            cpf: "958.521.251.65",
            telefone: 99999,
            email: "joao132@email.com",
            // consulta:{
            //     create:[
            //         {
            //             motivo: "Dor nas costas",
            //             data_consulta: new Date ("2023-08-25"),
            //             observacoes: "Ibuprofeno 3x ao dia",
            //         }
            //     ]
            // },
            // exame:{
            //     create: [
            //         {
            //             tipo: "Densiometro",
            //             data_exame: new Date ("2023-08-25"),
            //             type: "clinico",
            //             resultado: "deu ruim",
            //             link_arquivo: "url.com.br/exame.pdf",
            //             observacoes: ""
            //         }
            //     ]
            // },
        }
    });
}

main()
    .then(() => prisma.$disconnect())
    .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
});
