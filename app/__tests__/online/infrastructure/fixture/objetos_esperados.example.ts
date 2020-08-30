import { IAluno } from "../../../../domain/models/i_aluno";
import { ISemanaHorario } from "../../../../domain/models/i_horario";
import { IMateria } from "../../../../domain/models/i_materia";

// TODO sete este exemplo para poder rodar testes unitários online
// Depois, renomeie este arquivo(Ou copie e cola e renomeie), removendo APENAS o .example

//Para pegar um toquem de sessão, logue na sua conta do siga, aperte f12
//Clique na aba Application, logo em seguida na opção Cookies
//Selecione https://siga.cps.sp.gov.br
//Ira abrir uma tabela, procure a linha que tem o name ASP.NET_SessionId
//E copie o seu value, e cole dentro desta variável
export const TOKEN_DA_SESSAO : string = "ivzgqh550cv2ysymzrcb3o45"

//Digite o login da sua conta siga
export const LOGIN : string = "LoginAquiSP"
//Digite a senha da sua conta siga
export const PASSWORD : string = "senhaAQUI"

//Troque todos os dados pelo exatamente o que está cadastrado no siga
export const ALUNO_ESPERADO : IAluno = {
  cpf: "9999999999",
  dataDeNascimento: "20/01/1993",
  email: "<seuemail>@email.com",
  emailInstitutional: "seuEmailDaFacul@fatec.sp.gov.br",
  nome: "Seu nome, escrito em maiúsculo",
  nomeCurso: "Tecnologia em Análise e Desenvolvimento de Sistemas",
  ra: "1111111111111",
  periodo: "Examplo: Noite",
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
      abreviacaoNome: "EXP003",
      nome: "Eletiva - Linguagem de Programação IV - INTERNET",
    },
    {
      abreviacaoNome: "EXP004",
      nome: "Sistemas Operacionais II",
    },
    {
      abreviacaoNome: "EXP005",
      nome: "Metodologia da Pesquisa Científico-Tecnológica",
    },
  ]
}

// Você pode preparar está variavel apenas se 
// quizer testar a função do horarios, pois ela é bastante verbosa
// Troque todos os dados pelo o que está cadastrado no siga, deixe os horarios ordenados
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
            abreviacaoNome: 'ISO200',
            nome: 'Em breve o nome..'
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
            abreviacaoNome: 'ISO200',
            nome: 'Em breve o nome..'
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
            abreviacaoNome: 'IBD002',
            nome: 'Em breve o nome..'
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
            abreviacaoNome: 'IBD002',
            nome: 'Em breve o nome..'
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
            abreviacaoNome: 'ILP540',
            nome: 'Em breve o nome..'
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
            abreviacaoNome: 'ILP540',
            nome: 'Em breve o nome..'
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
            abreviacaoNome: 'ILP540',
            nome: 'Em breve o nome..'
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
            abreviacaoNome: 'ILP540',
            nome: 'Em breve o nome..'
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
            abreviacaoNome: 'IES300',
            nome: 'Em breve o nome..'
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
            abreviacaoNome: 'IES300',
            nome: 'Em breve o nome..'
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
            abreviacaoNome: 'IBD002',
            nome: 'Em breve o nome..'
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
            abreviacaoNome: 'IBD002',
            nome: 'Em breve o nome..'
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
            abreviacaoNome: 'TTG001',
            nome: 'Em breve o nome..'
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
            abreviacaoNome: 'TTG001',
            nome: 'Em breve o nome..'
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
            abreviacaoNome: 'ISO200',
            nome: 'Em breve o nome..'
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
            abreviacaoNome: 'ISO200',
            nome: 'Em breve o nome..'
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
            abreviacaoNome: 'IES300',
            nome: 'Em breve o nome..'
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
            abreviacaoNome: 'IES300',
            nome: 'Em breve o nome..'
          },
          turma: 'A'
        }
      ]
    }
  ]
}