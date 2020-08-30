import * as fs from 'fs';
import { IHtmlParser } from "../../../../domain/crawler/i_html_parser";
import { HtmlParser } from "../../../../infrastructure/crawler/html_parser";
import { ALUNO_ESPERADO, HORARIOS_ESPERADOS } from "../fixtures/objetos_esperados";

let htmlParser: IHtmlParser = new HtmlParser();
// describe("Testar a classe IHtmlParser", () => {
//   let htmlParser: IHtmlParser;

//   beforeAll(() => {
//     htmlParser = new HtmlParser();
//   });

  describe('Testar leitura do html do siga_home', () => {
    let data: string;

    beforeAll(() => {
      data = fs.readFileSync(__dirname + '/../fixtures/siga_home.html', 'utf8');
    })

    it('Deve ler o html do siga e transformar em um usuario', () => {
      const aluno = htmlParser.lerAlunoDaHome(data);
      const alunoEsperado = ALUNO_ESPERADO;
      expect(aluno).toStrictEqual(alunoEsperado);
    });
    it('Deve retornar true para o usuario logado', () => {
      const estaAutenticado = htmlParser.alunoEstaAutenticado(data);
      expect(estaAutenticado).toStrictEqual(true);
    });
  });

  describe('Testar leitura do html do siga_login_invalido', () => {
    let data: string;

    beforeAll(() => {
      data = fs.readFileSync(__dirname + '/../fixtures/siga_login_invalido.html', 'utf8');
    });

    it('Deve ler o html do siga e ver se o login foi inválido', () => {
      const estaAutenticado = htmlParser.alunoEstaAutenticado(data);
      expect(estaAutenticado).toStrictEqual(false);
    });
  });

  describe('Testar leitura do html do siga_horarios', () => {
    let data: string;

    beforeAll(() => {
      data = fs.readFileSync(__dirname + '/../fixtures/siga_horarios.html', 'utf8');
    });

    it('Deve ler o html do siga e gerar os horarios', () => {
      const horarios = htmlParser.lerHorarios(data);
      expect(horarios).toStrictEqual(HORARIOS_ESPERADOS);
    });
  });

  describe("Teste das funções internas", () => {
    let htmlParserImpl = new HtmlParser();
    it("testa a função lerMateriaDosHorarios", () => {
      const gxStateTabelaMaterias = { '0': { Props: [['vACD_DISCIPLINASIGLA_0001', 'EDS004', '', '', '', '', '', '', 0, 'Attribute', '', 'Attribute', -1, 0, 0, 0, 'px', 17, 'px', 20, 0, 0, 19, 1, 1, true, 'left'], ['vACD_DISCIPLINANOME_0001', 'Estágio Supervisionado em Análise e Desenvolvimento de Sistemas - 12hs/aula', '', '', '', '', '', '', 0, 'Attribute', '', 'Attribute', -1, 0, 0, 0, 'px', 17, 'px', 80, 0, 1, 19, 1, 1, true, 'left'], ['vACD_TURMALETRA_0001', 'A', '', '', '', '', '', '', 0, 'Attribute', '', 'Attribute', -1, 0, 0, 0, 'px', 17, 'px', 2, 0, 0, 19, 1, 1, true, 'left'], ['vPRO_PESSOALNOME_0001', 'VANESSA DOS ANJOS BORGES', '', '', '', '', '', '', 0, 'Attribute', '', 'Attribute', -1, 0, 0, 0, 'px', 17, 'px', 120, 0, 0, 19, 1, 1, true, 'left']], Grids: {}, Count: 4 }, '1': { Props: [['vACD_DISCIPLINASIGLA_0002', 'IBD002'], ['vACD_DISCIPLINANOME_0002', 'Banco de Dados - 4hs/aula'], ['vACD_TURMALETRA_0002'], ['vPRO_PESSOALNOME_0002', 'MARCELO BUSCIOLI TENORIO']], Grids: {}, Count: 4 }, '2': { Props: [['vACD_DISCIPLINASIGLA_0003', 'IES300'], ['vACD_DISCIPLINANOME_0003', 'Engenharia de Software III - 4hs/aula'], ['vACD_TURMALETRA_0003'], ['vPRO_PESSOALNOME_0003', 'ÁLVARO FERRAZ D\'ARCE']], Grids: {}, Count: 4 }, '3': { Props: [['vACD_DISCIPLINASIGLA_0004', 'ILP540'], ['vACD_DISCIPLINANOME_0004', 'Eletiva - Linguagem de Programação IV - INTERNET - 4hs/aula'], ['vACD_TURMALETRA_0004'], ['vPRO_PESSOALNOME_0004']], Grids: {}, Count: 4 }, '4': { Props: [['vACD_DISCIPLINASIGLA_0005', 'ISO200'], ['vACD_DISCIPLINANOME_0005', 'Sistemas Operacionais II - 4hs/aula'], ['vACD_TURMALETRA_0005'], ['vPRO_PESSOALNOME_0005', 'RODRIGO VILELA DA ROCHA']], Grids: {}, Count: 4 }, '5': { Props: [['vACD_DISCIPLINASIGLA_0006', 'TTG001'], ['vACD_DISCIPLINANOME_0006', 'Metodologia da Pesquisa Científico-Tecnológica - 2hs/aula'], ['vACD_TURMALETRA_0006'], ['vPRO_PESSOALNOME_0006']], Grids: {}, Count: 4 }, GridName: 'Grid1', Class: 'GridClear', Cellpadding: '1', Cellspacing: '2', Backcolorstyle: '0', Visible: '1', CmpContext: '', InMasterPage: 'false', Allowselection: 'false', Allowcollapsing: 'false', Collapsed: '0', Wrapped: false, Columns: [{ Value: 'EDS004', Enabled: '0' }, { Value: 'Estágio Supervisionado em Análise e Desenvolvimento de Sistemas - 12hs/aula', Enabled: '0' }, { Value: 'A', Enabled: '0' }, { Value: 'VANESSA DOS ANJOS BORGES', Enabled: '0' }], Count: 6 }
      const materiasEsperadas = [
        {
          abreviacaoNome: 'EDS004',
          nome: 'Estágio Supervisionado em Análise e Desenvolvimento de Sistemas'
        },
        { abreviacaoNome: 'IBD002', 
          nome: 'Banco de Dados' 
        },
        { 
          abreviacaoNome: 'IES300', 
          nome: 'Engenharia de Software III' 
        },
        {
          abreviacaoNome: 'ILP540',
          nome: 'Eletiva - Linguagem de Programação IV - INTERNET'
        },
        { 
          abreviacaoNome: 'ISO200', 
          nome: 'Sistemas Operacionais II' 
        },
        {
          abreviacaoNome: 'TTG001',
          nome: 'Metodologia da Pesquisa Científico-Tecnológica'
        }
      ]
      //@ts-ignore
      const materias = htmlParserImpl.lerMateriaDosHorarios(gxStateTabelaMaterias);
      expect(materias).toStrictEqual(materiasEsperadas);
    });
  })

// })