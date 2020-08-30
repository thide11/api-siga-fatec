import { IAluno } from "../models/i_aluno";
import { ISemanaHorario } from "../models/i_horario";

export abstract class IHtmlParser {
  abstract alunoEstaAutenticado(html : string) : boolean;
  abstract lerAlunoDaHome(html : string) : IAluno;
  abstract lerHorarios(html : string) : ISemanaHorario;
}