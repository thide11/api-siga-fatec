import { IAluno } from "../../domain/models/i_aluno";
import { ISemanaHorario } from "../../domain/models/i_horario";
import { IFatecApi } from "../../domain/crawler/i_fatec_api";
import { Rede } from "../../domain/rede/rede";
import { Endpoints, TOKEN_SESSAO, BASE_URL } from "../../domain/crawler/siga_constants";
import { IHtmlParser } from "../../domain/crawler/i_html_parser";
import { FatecApiError } from "../../domain/error/fatec_api_error";
import { FatecApiErrosCode } from "../../domain/error/error_codes";
import { AxiosRede } from "../rede/axios_rede";
import { HtmlParser } from "./html_parser";
import { gerarLoginPostData } from "../utils/gerar_login_post_data";

export class FatecApi implements IFatecApi {

  private rede : Rede;
  private htmlParser : IHtmlParser;
  private tokenDaSessao : string | undefined;
  constructor(rede : Rede | null = null, htmlParser : IHtmlParser | null = null){
    this.rede = rede ?? new AxiosRede();  
    this.htmlParser = htmlParser ?? new HtmlParser();
  }

  async logarComTokenDeSessao(tokenDeSessao: string): Promise<IAluno> {
    this.tokenDaSessao = tokenDeSessao;
    return this.lerUsuarioHome();
  }

  async logar(usuario: string, senha: string): Promise<IAluno> {
    if(!this.tokenDaSessao) {
      //O primeiro request e para ver o cookie do token da sessão gerado
      const responsePageLogin = await this.rede.get(BASE_URL + Endpoints.LOGIN);
      const tokenSessao = responsePageLogin.cookies[0];
      const token = tokenSessao.split("=")[1].split(";")[0];
      this.tokenDaSessao = token;
    }

    const loginBody = gerarLoginPostData(usuario, senha);

    //Efetua o login
    const postRedeResponse = await this.rede.post(BASE_URL + Endpoints.LOGIN, loginBody, 'application/x-www-form-urlencoded', this.pegarTokenSessaoCompleto());
    if(this.htmlParser.alunoEstaAutenticado(postRedeResponse.body)) {
      return this.lerUsuarioHome();
    } else {
      throw new FatecApiError(FatecApiErrosCode.CREDENCIAIS_INVALIDAS, "CREDENCIAIS INVÁLIDAS");
    }
  }

  private async lerUsuarioHome() : Promise<IAluno> {
    const response = await this.rede.get(BASE_URL + Endpoints.HOME, this.pegarTokenSessaoCompleto());
    
    if(response.body != null) {
      if(this.htmlParser.alunoEstaAutenticado(response.body)) {
        return this.htmlParser.lerAlunoDaHome(response.body);
      } else {
        throw new FatecApiError(FatecApiErrosCode.CREDENCIAIS_INVALIDAS, "CREDENCIAIS INVÁLIDAS");
      }
    } else {
      throw new FatecApiError(FatecApiErrosCode.SIGA_TIMEOUT, "O siga não retornou nenhum dado ao tentar acessar home");
    }
  }

  private pegarTokenSessaoCompleto() : string {
    if(this.tokenDaSessao != null) {
      return TOKEN_SESSAO.replace("{?}", this.tokenDaSessao);
    } else {
      throw new FatecApiError(FatecApiErrosCode.FALTANDO_TOKEN, "Chame o método fazer logar ou logar com token da sessão antes para poder chamar este método");
    }
  }



  async pegarHorario(): Promise<ISemanaHorario> {
    if(this.tokenDaSessao != null) {
      const response = await this.rede.get(BASE_URL + Endpoints.HORARIO, this.pegarTokenSessaoCompleto());
      if(response.body != null) {
        return this.htmlParser.lerHorarios(response.body);
      } else {
        throw new FatecApiError(FatecApiErrosCode.SIGA_TIMEOUT, "O siga não retornou nenhum dado ao tentar acessar o horário");
      }
    } else {
      throw new FatecApiError(FatecApiErrosCode.FALTANDO_TOKEN, "Chame o método fazer logar ou logar com token da sessão antes para poder chamar este método");
    }
  }

}