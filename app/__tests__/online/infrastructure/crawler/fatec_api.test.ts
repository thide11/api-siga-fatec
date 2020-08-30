import { IFatecApi } from "../../../../domain/crawler/i_fatec_api";
import { FatecApiErrosCode } from "../../../../domain/error/error_codes";
import { FatecApiError } from "../../../../domain/error/fatec_api_error";
import { IAluno } from "../../../../domain/models/i_aluno";
import { FatecApi } from "../../../../infrastructure/crawler/fatec_api";
import { HtmlParser } from "../../../../infrastructure/crawler/html_parser";
import { AxiosRede } from "../../../../infrastructure/rede/axios_rede";
import * as dotenv from 'dotenv';
import { PASSWORD, LOGIN, ALUNO_ESPERADO } from "../fixture/objetos_esperados";
dotenv.config();

const USUARIO = LOGIN;
const SENHA = PASSWORD;
//const TOKEN_SESSAO = TOKEN_DA_SESSAO;

describe('Testar o functionamento do login', () => {
  let fatecApi: IFatecApi;
  let alunoEsperado : IAluno;

  beforeAll(() => {
    fatecApi = new FatecApi(
      new AxiosRede(),
      new HtmlParser(),
    );
    //@ts-ignore
    alunoEsperado = ALUNO_ESPERADO;
  })

  // it('Deve retornar os dados do usuario com sucesso efetuando login com token de sessão', async () => {
  //   const aluno = await fatecApi
  //     .logarComTokenDeSessao(
  //       TOKEN_SESSAO,
  //     );
  //   expect(aluno).toStrictEqual(alunoEsperado);
  // });


  it('Deve retornar os dados do usuario com sucesso', async () => {
    const aluno = await fatecApi
    .logar(
      USUARIO,
      SENHA
    );
    expect(aluno).toStrictEqual(alunoEsperado);
  });

  it('Deve retornar erro, pois credenciais estão erradas', async () => {
    try {
      const requisicaoLogar = fatecApi
      .logar(
        "usuarioInexistente",
        "senhaInexistente"
      );
      await requisicaoLogar;
      fail('Fatec api deveria retornar um erro, pois credenciais estão invalidas');
    } catch (e) {
      expect(e instanceof FatecApiError);
      expect(e.code).toBe(FatecApiErrosCode.CREDENCIAIS_INVALIDAS);
    }
  });
});