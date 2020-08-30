
# Api Siga para Fatec

![imgSiga]

Api não oficial feita para a [ERP siga][urlSiga], para fatecanos ou faculdades que utilizam o siga

## Como funciona

Ele simula uma sessão do siga fazendo requisições HTTP `GET` e `POST`, Os dados vem de duas formas:

+ Na maioria dos dados vindos, Todo endpoint do siga, tem um campo de formulario escondido chamado GXState, que contem um json com os seus dados da sessão naquela página acessada
+ Lê o body do html retornado do siga e pega os dados a partir dele

## Como instalar e usar

Por enquanto, não é possivel usar esta api sem ter seguido os passos da aba "Como posso melhorar" deste readme

Um preview de como usar esta aplicação, seria algo como:

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
