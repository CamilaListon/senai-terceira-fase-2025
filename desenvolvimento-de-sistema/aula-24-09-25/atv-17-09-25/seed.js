import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

async function main() {
  // await prisma.usuario.createMany({
  //   data: [
  //     {
  //       nome: "Joao",
  //       email: "joao34@email.com",
  //       senha: "123",
  //       cargo: "Médico"
  //     },
  //     {
  //       nome: "Carlos",
  //       email: "Carlos@email.com",
  //       senha: "123",
  //       cargo: "Médico"
  //     },
  //     {
  //       nome: "Maria",
  //       email: "Maria@email.com",
  //       senha: "123",
  //       cargo: "Médico"
  //     },
  //     {
  //       nome: "Marcia",
  //       email: "marcia@email.com",
  //       senha: "123",
  //       cargo: "Médico"
  //     },
  //     {
  //       nome: "Carla",
  //       email: "carla@email.com",
  //       senha: "123",
  //       cargo: "Médico"
  //     },
  //     {
  //       nome: "Olivia",
  //       email: "olivia@email.com",
  //       senha: "123",
  //       cargo: "Médico"
  //     },
  //     {
  //       nome: "alexandre",
  //       email: "alexandre@email.com",
  //       senha: "123",
  //       cargo: "Médico"
  //     },
  //     {
  //       nome: "Mauricio",
  //       email: "mauricio@email.com",
  //       senha: "123",
  //       cargo: "Médico"
  //     },
  //     {
  //       nome: "Fabiola",
  //       email: "fabiola@email.com",
  //       senha: "123",
  //       cargo: "Médico"
  //     },
  //     {
  //       nome: "Fatima",
  //       email: "fatima@email.com",
  //       senha: "123",
  //       cargo: "Médico"
  //     },
  //     {
  //       nome: "Jessica",
  //       email: "jessica@email.com",
  //       senha: "123",
  //       cargo: "Médico"
  //     },
  //     {
  //       nome: "jamili",
  //       email: "jamili@email.com",
  //       senha: "123",
  //       cargo: "Médico"
  //     },
  //     {
  //       nome: "Marilia",
  //       email: "marilia@email.com",
  //       senha: "123",
  //       cargo: "Médico"
  //     },
  //     {
  //       nome: "Fabio",
  //       email: "fabio@email.com",
  //       senha: "123",
  //       cargo: "Médico"
  //     },
  //     {
  //       nome: "Luana",
  //       email: "luana@email.com",
  //       senha: "123",
  //       cargo: "Médico"
  //     },
  //     {
  //       nome: "Ana",
  //       email: "ana@email.com",
  //       senha: "123",
  //       cargo: "Médico"
  //     },
  //     {
  //       nome: "Ana Paula",
  //       email: "anapaula@email.com",
  //       senha: "123",
  //       cargo: "Médico"
  //     },
  //     {
  //       nome: "Ana Maria",
  //       email: "anamaria@email.com",
  //       senha: "123",
  //       cargo: "Médico"
  //     },
  //     {
  //       nome: "Ana Carla",
  //       email: "anacarla@email.com",
  //       senha: "123",
  //       cargo: "Médico"
  //     },
  //     {
  //       nome: "Beatriz",
  //       email: "beatriz@email.com",
  //       senha: "123",
  //       cargo: "Médico"
  //     },
  //     {
  //       nome: "Pamela",
  //       email: "pamela@email.com",
  //       senha: "123",
  //       cargo: "Médico"
  //     },
  //   ],
  // });

  

  await prisma.paciente.createMany({
    data: [
      {
        nome: "João",
        sexo: "Masculino",
        data_nascimento: new Date("1980-12-11"),
        cpf: "958.521.251.65",
        telefone: "952556232",
        email: "joao@email.com"
      },
      {
        nome: "Juliana Gomes",
        sexo: "Feminino",
        data_nascimento: new Date("1984-05-11"),
        cpf: "78412596371",
        telefone: "119751236",
        email: "juliana.gomes@email.com"
      }
    ]
  });
  

  await prisma.exame.createMany({
    data: [
      {
        data_exame: new Date("2023-08-25"),
        resultado: "deu ruim",
        link_arquivo: "url.com.br/exame.pdf",
      tipo_exame:"aasas0",
        observacoes: "",
        paciente_id: 1
      },
      {
        data_exame: new Date("2023-06-11"),
        resultado: "Normal",
        tipo_exame:"aasas0",

        link_arquivo: "url.com.br/exame0.pdf",
        observacoes: "Receitado paracetamol",
        paciente_id: 2
      }
    ]})

    await prisma.prontuario.createMany({
      data: [
        {
          descricao: "Paciente apresenta sintomas leves de gripe.",
          data: new Date("2023-01-15"),
          medico_responsavel_id: 1,
          paciente_id: 1
        },
        {
          descricao: "Tratamento pós-operatório de cirurgia de joelho.",
          data: new Date("2023-02-20"),
          medico_responsavel_id: 2,
          paciente_id: 2
        },
        {
          descricao: "Acompanhamento de pressão arterial alta.",
          data: new Date("2023-03-05"),
          medico_responsavel_id: 3,
          paciente_id: 3
        },
        {
          descricao: "Avaliação de dor crônica na coluna lombar.",
          data: new Date("2023-04-10"),
          medico_responsavel_id: 4,
          paciente_id: 4
        },
        {
          descricao: "Consulta para controle de diabetes tipo 2.",
          data: new Date("2023-05-12"),
          medico_responsavel_id: 5,
          paciente_id: 5
        },
        {
          descricao: "Exame físico anual e avaliação geral da saúde.",
          data: new Date("2023-06-18"),
          medico_responsavel_id: 1,
          paciente_id: 2
        },
        {
          descricao: "Paciente relatou sintomas de ansiedade e insônia.",
          data: new Date("2023-07-22"),
          medico_responsavel_id: 3,
          paciente_id: 4
        },
        {
          descricao: "Tratamento para infecção urinária com antibióticos.",
          data: new Date("2023-08-30"),
          medico_responsavel_id: 2,
          paciente_id: 1
        },
        {
          descricao: "Acompanhamento pós-infarto e ajustes de medicação.",
          data: new Date("2023-09-15"),
          medico_responsavel_id: 5,
          paciente_id: 3
        },
        {
          descricao: "Consulta para avaliação de alergias sazonais.",
          data: new Date("2023-10-05"),
          medico_responsavel_id: 4,
          paciente_id: 5
        }
      ]
    });
    

  await prisma.consulta.createMany({
    data: [
      {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      },
      {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      }, {
        motivo: "Dor nas costas",
        data_consulta: new Date("2023-08-25"),
        observacoes: "Ibuprofeno 3 vezes ao dia",
        medico_responsavel_id: 1,
        paciente_id: 1
      },
    ]
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });

