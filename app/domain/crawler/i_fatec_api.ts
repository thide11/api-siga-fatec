import { ISemanaHorario } from "../models/i_horario";
import { IAluno } from "../models/i_aluno";

export interface IFatecApi {
  logarComTokenDeSessao(tokenDeSessao : string) : Promise<IAluno>;
  //Retorna o token da sessão
  logar(usuario : string, senha : string) : Promise<IAluno>;
  //Funciona desde que você ja esteja logado
  pegarHorario() : Promise<ISemanaHorario>;
}