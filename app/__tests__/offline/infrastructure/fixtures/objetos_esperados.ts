import { IMateria } from "../../../../domain/models/i_materia";
import { IAluno } from "../../../../domain/models/i_aluno";
import { ISemanaHorario } from "../../../../domain/models/i_horario";

export const TOKEN_DA_SESSAO_MOCK : string = "ivzgqh550cvfgsselrcb5o55"
export const LOGIN_MOCK : string = "loginFake"
export const SENHA_MOCK : string = "senhaFake"

export const ALUNO_ESPERADO : IAluno = {
  cpf: "9999999999",
  dataDeNascimento: "20/01/1993",
  email: "seuEmail@email.com",
  emailInstitutional: "seuEmailDaFacul@fatec.sp.gov.br",
  nome: "Seu nome, escrito em maiúsculo",
  nomeCurso: "Tecnologia em Análise e Desenvolvimento de Sistemas",
  ra: "1111111111111",
  periodo: "Exemplo: Noite",
  semestre: 1, //Numero do semestre que você está atualmente
  //Nome das matérias que você esta cursando
  //! Deixe ordenado igual como esta no menu do siga
  materiasCursando: <IMateria[]>[
    {
      abreviacaoNome: "EXP001",
      nome: "Estágio Supervisionado em Análise e Desenvolvimento de Sistemas",
    },
    {
      abreviacaoNome: "EXP002",
      nome: "Banco de Dados",
    },
    {
      abreviacaoNome: "EXP003",
      nome: "Engenharia de Software III",
    },
    {
      abreviacaoNome: "EXP004",
      nome: "Eletiva - Linguagem de Programação IV - INTERNET",
    },
    {
      abreviacaoNome: "EXP005",
      nome: "Sistemas Operacionais II",
    },
    {
      abreviacaoNome: "EXP006",
      nome: "Metodologia da Pesquisa Científico-Tecnológica",
    },
  ]
}

export const HORARIOS_ESPERADOS : ISemanaHorario = {
  diaDaSemana: [
    {
      nomeDoDia: 'Segunda-Feira',
      aulas: [
        {
          horarioInicial: {
            horario: '19:00',
            horarioDesdeMeiaNoite: 1140
          },
          horarioFinal: {
            horario: '19:50',
            horarioDesdeMeiaNoite: 1190
          },
          materia: {
            abreviacaoNome: 'EXP005',
            nome: 'Sistemas Operacionais II'
          },
          turma: 'A'
        },
        {
          horarioInicial: {
            horario: '19:50',
            horarioDesdeMeiaNoite: 1190
          },
          horarioFinal: {
            horario: '20:40',
            horarioDesdeMeiaNoite: 1240
          },
          materia: {
            abreviacaoNome: 'EXP005',
            nome: 'Sistemas Operacionais II'
          },
          turma: 'A'
        },
        {
          horarioInicial: {
            horario: '20:50',
            horarioDesdeMeiaNoite: 1250
          },
          horarioFinal: {
            horario: '21:40',
            horarioDesdeMeiaNoite: 1300
          },
          materia: {
            abreviacaoNome: 'EXP002',
            nome: 'Banco de Dados'
          },
          turma: 'A'
        },
        {
          horarioInicial: {
            horario: '21:40',
            horarioDesdeMeiaNoite: 1300
          },
          horarioFinal: {
            horario: '22:30',
            horarioDesdeMeiaNoite: 1350
          },
          materia: {
            abreviacaoNome: 'EXP002',
            nome: 'Banco de Dados'
          },
          turma: 'A'
        }
      ]
    },
    {
      nomeDoDia: 'Terça-Feira',
      aulas: [
        {
          horarioInicial: {
            horario: '19:00',
            horarioDesdeMeiaNoite: 1140
          },
          horarioFinal: {
            horario: '19:50',
            horarioDesdeMeiaNoite: 1190
          },
          materia: {
            abreviacaoNome: 'EXP004',
            nome: 'Eletiva - Linguagem de Programação IV - INTERNET'
          },
          turma: 'A'
        },
        {
          horarioInicial: {
            horario: '19:50',
            horarioDesdeMeiaNoite: 1190
          },
          horarioFinal: {
            horario: '20:40',
            horarioDesdeMeiaNoite: 1240
          },
          materia: {
            abreviacaoNome: 'EXP004',
            nome: 'Eletiva - Linguagem de Programação IV - INTERNET'
          },
          turma: 'A'
        },
        {
          horarioInicial: {
            horario: '20:50',
            horarioDesdeMeiaNoite: 1250
          },
          horarioFinal: {
            horario: '21:40',
            horarioDesdeMeiaNoite: 1300
          },
          materia: {
            abreviacaoNome: 'EXP004',
            nome: 'Eletiva - Linguagem de Programação IV - INTERNET'
          },
          turma: 'A'
        },
        {
          horarioInicial: {
            horario: '21:40',
            horarioDesdeMeiaNoite: 1300
          },
          horarioFinal: {
            horario: '22:30',
            horarioDesdeMeiaNoite: 1350
          },
          materia: {
            abreviacaoNome: 'EXP004',
            nome: 'Eletiva - Linguagem de Programação IV - INTERNET'
          },
          turma: 'A'
        }
      ]
    },
    {
      nomeDoDia: 'Quarta-Feira',
      aulas: [
        {
          horarioInicial: {
            horario: '19:00',
            horarioDesdeMeiaNoite: 1140
          },
          horarioFinal: {
            horario: '19:50',
            horarioDesdeMeiaNoite: 1190
          },
          materia: {
            abreviacaoNome: 'EXP003',
            nome: 'Engenharia de Software III'
          },
          turma: 'A'
        },
        {
          horarioInicial: {
            horario: '19:50',
            horarioDesdeMeiaNoite: 1190
          },
          horarioFinal: {
            horario: '20:40',
            horarioDesdeMeiaNoite: 1240
          },
          materia: {
            abreviacaoNome: 'EXP003',
            nome: 'Engenharia de Software III'
          },
          turma: 'A'
        },
        {
          horarioInicial: {
            horario: '20:50',
            horarioDesdeMeiaNoite: 1250
          },
          horarioFinal: {
            horario: '21:40',
            horarioDesdeMeiaNoite: 1300
          },
          materia: {
            abreviacaoNome: 'EXP002',
            nome: 'Banco de Dados'
          },
          turma: 'A'
        },
        {
          horarioInicial: {
            horario: '21:40',
            horarioDesdeMeiaNoite: 1300
          },
          horarioFinal: {
            horario: '22:30',
            horarioDesdeMeiaNoite: 1350
          },
          materia: {
            abreviacaoNome: 'EXP002',
            nome: 'Banco de Dados'
          },
          turma: 'A'
        }
      ]
    },
    {
      nomeDoDia: 'Quinta-Feira',
      aulas: [
        {
          horarioInicial: {
            horario: '19:00',
            horarioDesdeMeiaNoite: 1140
          },
          horarioFinal: {
            horario: '19:50',
            horarioDesdeMeiaNoite: 1190
          },
          materia: {
            abreviacaoNome: 'EXP006',
            nome: 'Metodologia da Pesquisa Científico-Tecnológica'
          },
          turma: 'A'
        },
        {
          horarioInicial: {
            horario: '19:50',
            horarioDesdeMeiaNoite: 1190
          },
          horarioFinal: {
            horario: '20:40',
            horarioDesdeMeiaNoite: 1240
          },
          materia: {
            abreviacaoNome: 'EXP006',
            nome: 'Metodologia da Pesquisa Científico-Tecnológica'
          },
          turma: 'A'
        }
      ]
    },
    {
      nomeDoDia: 'Sexta-Feira',
      aulas: [
        {
          horarioInicial: {
            horario: '19:00',
            horarioDesdeMeiaNoite: 1140
          },
          horarioFinal: {
            horario: '19:50',
            horarioDesdeMeiaNoite: 1190
          },
          materia: {
            abreviacaoNome: 'EXP005',
            nome: 'Sistemas Operacionais II'
          },
          turma: 'A'
        },
        {
          horarioInicial: {
            horario: '19:50',
            horarioDesdeMeiaNoite: 1190
          },
          horarioFinal: {
            horario: '20:40',
            horarioDesdeMeiaNoite: 1240
          },
          materia: {
            abreviacaoNome: 'EXP005',
            nome: 'Sistemas Operacionais II'
          },
          turma: 'A'
        }
      ]
    },
    {
      nomeDoDia: 'Sábado',
      aulas: [
        {
          horarioInicial: {
            horario: '09:30',
            horarioDesdeMeiaNoite: 570
          },
          horarioFinal: {
            horario: '10:20',
            horarioDesdeMeiaNoite: 620
          },
          materia: {
            abreviacaoNome: 'EXP003',
            nome: 'Engenharia de Software III'
          },
          turma: 'A'
        },
        {
          horarioInicial: {
            horario: '10:20',
            horarioDesdeMeiaNoite: 620
          },
          horarioFinal: {
            horario: '11:10',
            horarioDesdeMeiaNoite: 670
          },
          materia: {
            abreviacaoNome: 'EXP003',
            nome: 'Engenharia de Software III'
          },
          turma: 'A'
        }
      ]
    }
  ]
}