# Api Siga para Fatec

[![Sob a licença gpl][licensaBadge]][npmLink]
[![Disponível no NPM][npmBadge]][npmLink]

Api não oficial feita para a [ERP siga][urlSiga], para fatecanos ou faculdades que utilizam o siga

## Atenção❗ Este projeto foi descontinuado

Este projeto foi escrito em 2020 e o siga passou por várias alterações, por exemplo, como a IA facilitou ataques de brechas de segurança, o siga em 2026 teve que refazer seu sistema de login para contas microsoft, impossibilitando usar a bibliteca pois ela usava o usuário e senha do SIGA

Gostaria de agradecer todos os +2 mil downloads que confiaram nesta bibliteca para trazer os dados do SIGA.

## Como funcionava

Ele simula uma sessão do siga fazendo requisições HTTP `GET` e `POST`, Os dados vem de duas formas:

+ Na maioria dos dados vindos, Todo endpoint do siga, tem um campo de formulario escondido chamado GXState, que contem um json com os seus dados da sessão naquela página acessada
+ Lê o body do html retornado do siga e pega os dados a partir dele

## Como instalar e usar

Com o node(npm) instalado, digite `npm i api-siga-fatec` no terminal

Para usar esta biblioteca:

    import FatecApi from 'api-siga-fatec';
    
    const fatecApi = new FatecApi();
    testar();
       
    async function testar() {
        const usuario = await fatecApi.logar(
            "SeuLoginNoSiga",
            "SuaSenhaNoSiga"
        );
        console.log(`O seu nome é ${usuario.nome}!`);
    }

Ao efetuar login, ele te retorna 10 dados do estudante:

+ email
+ emailInstitutional
+ cpf
+ ra
+ dataDeNascimento
+ materiasCursando
+ nomeCurso
+ periodo
+ semestre

De uma instancia de `FatecApi`, depois de chamar o método `.logar`, você tambem pode usar o `.pegarHorario`, te retornando os horários do aluno

O código estará sempre estará disponível para melhorias e novas funcionalidades

[urlSiga]: https://siga.cps.sp.gov.br/aluno/login.aspx
[npmBadge]: https://img.shields.io/npm/v/api-siga-fatec "Disponível no npm"
[licensaBadge]: https://img.shields.io/npm/l/api-siga-fatec "Sob a licença GPL"
[npmLink]: https://www.npmjs.com/package/api-siga-fatec "Link do npm"
