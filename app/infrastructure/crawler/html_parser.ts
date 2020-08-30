import * as cheerio from 'cheerio';
import { DOM_ALUNO_CPF, DOM_ALUNO_DATA_NASCIMENTO, DOM_ALUNO_EMAIL, DOM_ALUNO_EMAIL_INSTITUCIONAL, DOM_FORM_INPUT_SAIDA_ERROS, DOM_FORM_INPUT_USUARIO, DOM_GXSTATE } from "../../domain/crawler/dom_constants";
import { IHtmlParser } from "../../domain/crawler/i_html_parser";
import { IAluno } from "../../domain/models/i_aluno";
import { ISemanaHorario, IAula, IHorarioDiaDaSemana } from "../../domain/models/i_horario";
import { IMateria } from "../../domain/models/i_materia";
import { lerHoraParaInt } from '../utils/ler_hora';
import { FatecApiError } from '../../domain/error/fatec_api_error';
import { FatecApiErrosCode } from '../../domain/error/error_codes';

export class HtmlParser extends IHtmlParser {
  
  alunoEstaAutenticado(html : string) : boolean {
    const $ = cheerio.load(html);
    const elementoLogin = $(DOM_FORM_INPUT_USUARIO);
    const elementoErros = $(DOM_FORM_INPUT_SAIDA_ERROS);
    return elementoLogin.html() == null && elementoErros?.html() != "Não confere Login e Senha";
  }
  
  lerAlunoDaHome(html : string) : IAluno {
    const $ = cheerio.load(html);
    const gxStateData = this.lerGxState($);

    return <IAluno>{
      nome: gxStateData.MPW0041vPRO_PESSOALNOME.slice(0, -2),
      cpf: $(DOM_ALUNO_CPF).html(),
      dataDeNascimento: $(DOM_ALUNO_DATA_NASCIMENTO).html(),
      email: $(DOM_ALUNO_EMAIL).html(),
      emailInstitutional: $(DOM_ALUNO_EMAIL_INSTITUCIONAL).html(),
      semestre: parseInt(gxStateData.MPW0041vACD_ALUNOCURSOCICLOATUAL),
      ra: gxStateData.MPW0041vACD_ALUNOCURSOREGISTROACADEMICOCURSO,
      nomeCurso: gxStateData.vACD_CURSONOME_MPAGE,
      periodo: gxStateData.vACD_PERIODODESCRICAO_MPAGE,
      materiasCursando: this.lerMaterias(gxStateData),
    }
  }

  private lerGxState($ : CheerioStatic) {
    const gxState : string = $(DOM_GXSTATE).val();
    //Preciso destes replaces para corrigir um comportamento estranho do JSON.parse
    //Com a tag </b> dentro do valor do json
    const gxFiltrado = gxState.replace(/\\>/g, "\\\\>");
    const gxStateData = JSON.parse(gxFiltrado);
    return gxStateData;
  }

  private lerMaterias(gxStateData : any) : IMateria[] {
    const abasMenu = gxStateData["vTREENODECOLLECTIONDATA_MPAGE"][0]["Nodes"];
    const materias : IMateria[] = []
    for(const menuItem of abasMenu) {
      if(menuItem["Id"] == "Planos de Ensino") {
        for(const materiaItem of menuItem["Nodes"]) {
          const nome : string = materiaItem["Name"];
          const dadosMateria = nome.split("-");
          const abreviacaoNome = dadosMateria[0];
          dadosMateria.shift();
          const nomeMateria = dadosMateria.join("-");
          const materiaModel : IMateria = {
            abreviacaoNome: abreviacaoNome,
            nome: nomeMateria,
          }
          materias.push(
            materiaModel
          );
        }
        break;
      }
    }
    return materias;
  }

  lerHorarios(html : string) : ISemanaHorario {
    const $ = cheerio.load(html);
    const gxStateData = this.lerGxState($);

    let i = 1;
    const nome_dias_semana = [
      "Domingo",
      "Segunda-Feira",
      "Terça-Feira",
      "Quarta-Feira",
      "Quinta-Feira",
      "Sexta-Feira",
      "Sábado",
    ]
    const horarioDiaDaSemana : IHorarioDiaDaSemana[] = [];
    let materias : IMateria[];
    while (gxStateData[`Grid${i}ContainerData`]) {
      const gridContainerData = JSON.parse(gxStateData[`Grid${i}ContainerData`]);
      if(i == 1) {
        materias = this.lerMateriaDosHorarios(gridContainerData);
      } else {
        let aulas : IAula[] = [];
        //Começa a ler a linha
        for (let indexLinha = 0; indexLinha < gridContainerData.Count; indexLinha++) {
          const gridLinha : { Props : any[], Count : number} = gridContainerData[indexLinha];
          //@ts-ignore
          let aula : IAula = {};
          //Coluna 0 - Nenhum dado revelante
          //Coluna 1 - Horario inicial - Final da aula
          //Coluna 2 - AbreviacaoNome da matéria
          //Coluna 3 - Letra da turma - ! Pode não ser enviado
          for (let indexColuna = 1; indexColuna < 4; indexColuna++) {
            const elemento = gridLinha.Props[indexColuna];
            if(elemento.length >= 2) {
              if(indexColuna == 1) {
                const horario : string = elemento[1];
                const horarioInicialEFinal = horario.split("-");
                const horaInicial = horarioInicialEFinal[0];
                aula.horarioInicial = {
                  horario: horaInicial,
                  horarioDesdeMeiaNoite: lerHoraParaInt(horaInicial)
                }
                const horaFinal = horarioInicialEFinal[1];
                aula.horarioFinal = {
                  horario: horaFinal,
                  horarioDesdeMeiaNoite: lerHoraParaInt(horaFinal)
                }
              }
              if(indexColuna == 2) {
                const nomeAbreviado : string = elemento[1];
                //@ts-ignore
                const materia = materias.find((materia) => materia.abreviacaoNome == nomeAbreviado);
                if(materia) {
                  aula.materia = materia;
                } else {
                  throw new FatecApiError(FatecApiErrosCode.ERRO_INTERNO, `Foi encontrado uma matéria abreviação ${nomeAbreviado} que não esta cadastrado no siga`);
                }
              }
              if(indexColuna == 3) {
                aula.turma = elemento[1];
              }
            } else {
              if(indexColuna == 3) {
                //
                aula.turma = "A"
                break;
              }
              console.log(`Grid container numero ${i}, linha ${indexLinha}, coluna ${indexColuna} não tem um lenght de 2 elementos, break ativado`);
              break;
            }
          }
          aulas.push(aula);
        }

        //Ordena a aula, de acordo com o seu horario
        aulas.sort((a, b) => {
          return a.horarioInicial.horarioDesdeMeiaNoite - b.horarioInicial.horarioDesdeMeiaNoite;
        });

        horarioDiaDaSemana.push({
          nomeDoDia: nome_dias_semana[i-1],
          aulas,
        });
      }
      i++;
    } 

    //@ts-ignore
    return {
      diaDaSemana: horarioDiaDaSemana
    };
  }

  lerMateriaDosHorarios(gridContainerData : any) : IMateria[] {
    const materias : IMateria[] = [];
    for (let indexLinha = 0; indexLinha < gridContainerData.Count; indexLinha++) {
      const gridLinha : { Props : any[], Count : number} = gridContainerData[indexLinha];
      //Coluna 0 - AbreviacaoNome da matéria
      //Coluna 1 - Nome da matéria com um sufixo '- xxhs/aula'
      //Coluna 2 - Nome da turma
      //Coluna 3 - Nome do professor
      //A partir da coluna 2 os dados podem não aparecer, portanto não são tão confiaveis
      //@ts-ignore
      let materia : IMateria = {}
      for (let indexColuna = 0; indexColuna < 4; indexColuna++) {
        const elemento = gridLinha.Props[indexColuna];
        if(elemento.length >= 2) {
          switch(indexColuna) {
            case 0:
              materia.abreviacaoNome = elemento[1]
              break;
            case 1:
              const nomeMateriaComSufixo : string = elemento[1]
              const nomeMateriaArray = nomeMateriaComSufixo.split("-")
              //.pop() para remover o sufixo
              nomeMateriaArray.pop();
              const nomeMateria = nomeMateriaArray.join("-").trim();
              materia.nome = nomeMateria;
            //Leitura da letra da turma e do nome do professor não implementadas ainda
          }
        }
      }
      materias.push(materia);
    }
    return materias;
  }
}  