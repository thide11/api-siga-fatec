# Api Siga para Fatec

[![Sob a licença gpl][licensaBadge]][npmLink]
[![Build no travisCi][travisCIBadge]][travisCiLink]
[![Disponível no NPM][npmBadge]][npmLink]

![imgSiga]

Api não oficial feita para a [ERP siga][urlSiga], para fatecanos ou faculdades que utilizam o siga

## Como funciona

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

## Como posso melhorar

Se você quiser corrigir erros ou adicionar novas funcionalidades, sinta-se a vontade

Para duplicar ele e testar ele, faça o seguite processo:

+ Certifique de que tenha [git][urlGit] instalado no seu pc
+ De um `git clone <UrlDesteRepositório>` no terminal
+ Depois, se você quizer efetuar testes online, abra o código fonte, e navega dentro do projeto, para o diretório app/online/\_\_tests\_\_/infrastructure/fixtures
+ Dentro da maioria dos arquivos dentro desta pasta, terá instruções de como preparar o codigo fonte para testes unitários
+ Logo após ter seguido todas as intruções, teste no terminal com o comando `npm test`, ou `npm test:offline` se não tiver configurado para efetuar testes online

## Motivação

Eu tenho conhecimento da biblioteca do [filipe][bibliotecafilipe] que faz exatamente a mesma coisa.

O motivo de ter feito uma igual foi para que ele **seja escrita em português**, de **código limpo** e para **alimentar uma futura aplicação que irá consumir ela**

[bibliotecafilipe]: https://github.com/filipemeneses/fatec-api
[urlGit]: https://git-scm.com/download/win
[urlSiga]: https://siga.cps.sp.gov.br/aluno/login.aspx
[imgSiga]: https://siga.cps.sp.gov.br/aluno/Resources/logosiga.png "Logo do siga"
[travisCIBadge]: https://travis-ci.com/thide11/api-siga-fatec.svg?branch=master "Imagem da build no travisCI"
[travisCILink]: https://travis-ci.com/thide11/api-siga-fatec "Build no travisCI"
[npmBadge]: https://img.shields.io/npm/v/api-siga-fatec "Disponível no npm"
[licensaBadge]: https://img.shields.io/npm/l/api-siga-fatec "Sob a licença GPL"
[npmLink]: https://www.npmjs.com/package/api-siga-fatec "Link do npm"
