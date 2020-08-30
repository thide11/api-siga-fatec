import { mocked } from 'ts-jest/utils'
import * as fs from 'fs';
import { IFatecApi } from "../../../../domain/crawler/i_fatec_api";
import { FatecApiErrosCode } from "../../../../domain/error/error_codes";
import { FatecApiError } from "../../../../domain/error/fatec_api_error";
import { IAluno } from "../../../../domain/models/i_aluno";
import { FatecApi } from "../../../../infrastructure/crawler/fatec_api";
import { HtmlParser } from "../../../../infrastructure/crawler/html_parser";
import { AxiosRede } from "../../../../infrastructure/rede/axios_rede";
import { ALUNO_ESPERADO, LOGIN_MOCK, SENHA_MOCK, TOKEN_DA_SESSAO_MOCK } from "../fixtures/objetos_esperados";
import axios, { AxiosResponse } from "axios";
import { Endpoints, BASE_URL } from '../../../../domain/crawler/siga_constants';
import { gerarLoginPostData } from '../../../../infrastructure/utils/gerar_login_post_data';

const USUARIO = LOGIN_MOCK;
const SENHA = SENHA_MOCK;
const TOKEN_SESSAO = TOKEN_DA_SESSAO_MOCK;


jest.mock('axios');
const axiosMock = mocked(axios, true);

function gerarResponse(data : any, status : number = 200, headers : {} = {}){
  return Promise.resolve(
    <AxiosResponse<any>>{
      status,
      headers,
      data,
      statusText: "Status text de um mock",
    }
  )
}

const dataSigaLogin = fs.readFileSync(__dirname + '/../fixtures/siga_login.html', 'utf8');
axiosMock.get.mockImplementation((url, config) : Promise<AxiosResponse<any>> => {
  const sessionIdSimulado = TOKEN_SESSAO;
  if(url == (BASE_URL + Endpoints.LOGIN)) {
    return gerarResponse(
      "1", 
      200, 
      {
        'set-cookie': [
          `ASP.NET_SessionId=${sessionIdSimulado}; path=/; HttpOnly`
        ]
      },
    );
  }

  const cookieEnviado : string = config?.headers['Cookie'];
  if(url == (BASE_URL + Endpoints.HOME)) {
    if(cookieEnviado && cookieEnviado.includes(sessionIdSimulado)) {
      const data = fs.readFileSync(__dirname + '/../fixtures/siga_home.html', 'utf8');
      return gerarResponse(data);
    } else {
      return gerarResponse(dataSigaLogin);    
    }
  }
  if(url == (BASE_URL + Endpoints.HORARIO)) {
    if(cookieEnviado.includes(sessionIdSimulado)) {
      const data = fs.readFileSync(__dirname + '/../fixtures/siga_horarios.html', 'utf8');
      return gerarResponse(data);
    } else {
      return gerarResponse(dataSigaLogin);
    }
  }
  return gerarResponse("", 404);
});

axiosMock.post.mockImplementation((url, data, config) : Promise<AxiosResponse<any>> => {
  const cookieEnviado : string = config?.headers['Cookie'];
  if(url == (BASE_URL + Endpoints.LOGIN)) {
    if(data == gerarLoginPostData(USUARIO, SENHA) && cookieEnviado.includes(TOKEN_SESSAO)) {
      //Verifica se as credenciais estão corretas
      return gerarResponse(1);
    } else {
      return gerarResponse(dataSigaLogin);    
    }
  }
  return gerarResponse("", 404);
});

describe('Testar o functionamento do login offline', () => {
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

  it('Deve retornar os dados do usuario com sucesso efetuando login com token de sessão offline', async () => {
    const aluno = await fatecApi
      .logarComTokenDeSessao(
        TOKEN_SESSAO,
      );
    expect(aluno).toStrictEqual(alunoEsperado);
  });


  it('Deve retornar os dados do usuario com sucesso offline', async () => {
    const aluno = await fatecApi
    .logar(
      USUARIO,
      SENHA
    );
    expect(aluno).toStrictEqual(alunoEsperado);
  });

  it('Deve retornar erro, pois credenciais estão erradas offline', async () => {
    try {
      const requisicaoLogar = fatecApi
      .logar(
        "usuarioInexistente",
        "senhaInexistente"
      );
      await requisicaoLogar;
      fail('Fatec api deveria retornar um erro, pois credenciais estão invalidas');
    } catch (e) {
      if(e instanceof FatecApiError) {
        expect(e.code).toBe(FatecApiErrosCode.CREDENCIAIS_INVALIDAS);
      } else {
        throw e;
        //fail(`Retornou um erro que não é da FatecApi : ${e}`);
      }
    }
  });
});