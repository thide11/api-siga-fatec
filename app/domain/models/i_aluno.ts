import { IMateria } from "./i_materia";

export interface IAluno {
  nome : string;
  email : string;
  emailInstitutional : string;
  cpf : string;
  ra : string;
  dataDeNascimento : string;
  materiasCursando : IMateria[]
  nomeCurso : string;
  periodo : string;
  semestre : number;
}