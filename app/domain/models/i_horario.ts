import { IMateria } from "./i_materia";

export interface ISemanaHorario {
  diaDaSemana : IHorarioDiaDaSemana[]
}

export interface IHorarioDiaDaSemana {
  nomeDoDia : string;
  aulas : IAula[]
}

export interface IAula {
  horarioInicial : IHorario;
  horarioFinal : IHorario;
  materia : IMateria;
  turma : string;
}

export interface IHorario {
  horarioDesdeMeiaNoite : number
  horario : string;
}
