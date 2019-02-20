import {VpHttp} from './http/vphttp'
import {prompt} from 'inquirer'

export class Delivery{
    private dadosPedido : any = null;
    private dadosEntrega : any = null;
    private Sabor : any = [];
    private Tamanho : any = [];
    private Cidade : any = [];
    private Bairro : any = [];

    public fazerPedido(){
        this.getTamanho();
        
    }

    private perguntarDadosPedido(){
        prompt(
            [
                {
                    name: 'nome',
                    type: 'input',
                    message: 'Qual o seu nome: ',
                },

                {
                    name: 'telefone',
                    type: 'input',
                    message: 'Seu telefone? ',
                },

                {
                    name: 'tamanho',
                    type: 'list',
                    message: 'Qual o tamanho?',
                    choices: this.Tamanho
                },

                {
                    name: 'sabor',
                    type: 'list',
                    message: 'Qual o sabor? ',
                    choices: this.Sabor
                },

                {
                    name: 'quantidade',
                    type: 'input',
                    message: 'Quantas você deseja? ',
                },

                {
                    name: 'entrega',
                    type: 'list',
                    message: 'Deseja que seja entregue?',
                    choices: ['Sim', 'Não'],
                }

            ]
        ).then(
            (answers : any) => {
                this.dadosPedido = answers;

                if (answers.entrega === 'Sim'){
                    this.perguntarDadosEntrega();
                } else {
                    this.imprimirRelatorio();
                }
            }
        );
    }

    private perguntarDadosEntrega(){
        prompt(
            [
                {
                    name: 'cidade',
                    type: 'list',
                    message: 'Qual a cidade?',
                    choices: this.Cidade
                },

                {
                    name: 'bairro',
                    type: 'list',
                    message: 'Qual o bairro?',
                    choices: this.Bairro
                },

                {
                    name: 'rua',
                    type: 'input',
                    message: 'Qual a rua?',
                },

                {
                    name: 'numero',
                    type: 'input',
                    message: 'Qual o número?',
                },

                {
                    name: 'complemento',
                    type: 'input',
                    message: 'Qual o complemento?',
                }
            ]
        ).then(
                (answers : any) => {
                    this.dadosEntrega = answers;
                    this.imprimirRelatorio();
                }
            );
    }

    private imprimirRelatorio(){
        console.log("Nome do cliente: "+this.dadosPedido.nome);
        console.log("Telefone de "+this.dadosPedido.nome+": "+this.dadosPedido.telefone);
        console.log("Tamanho da pizza pedida: "+this.dadosPedido.tamanho);
        console.log("Sabor escolhido: "+this.dadosPedido.sabor);
        console.log("Quantidade desejada "+this.dadosPedido.quantidade);
        console.log("É para ser entregue? "+this.dadosPedido.entrega);
        if (this.dadosEntrega !== null) {
            console.log("======================")
            console.log("Cidade a ser entregue: "+this.dadosEntrega.cidade);
            console.log("Bairro a ser entregue: "+this.dadosEntrega.bairro);
            console.log("Rua a ser entregue: "+this.dadosEntrega.rua);
            console.log("Número da residencia: "+this.dadosEntrega.numero);
            console.log("Complemento: "+this.dadosEntrega.complemento);
        }
    }

    public getSabores(){
        new VpHttp('http://5c649d4cc969210014a32ec3.mockapi.io/sabor').get().subscribe(
            (data : any) => {
                data.forEach((element : any) => {
                    if(element.disponivel === true){
                        this.Sabor.push(element.Nome)
                    }
                });
                this.getCidade()
            },
            (error : any) => {
                console.log(error);
            }
        );
    }

    public getTamanho(){
        new VpHttp('http://5c649d4cc969210014a32ec3.mockapi.io/tamanho').get().subscribe(
            (data : any) => {
                data.forEach((element : any) => {
                    this.Tamanho.push(element.Nome)
                });
                this.getSabores();
            },
            (error : any) => {
                console.log(error);
            }
        );
    }

    public getCidade(){
        new VpHttp('http://5c649d4cc969210014a32ec3.mockapi.io/cidade').get().subscribe(
            (data : any) => {
                data.forEach((element : any) => {
                    this.Cidade.push(element.Nome)
                    
                });
            this.GetBairro();
            },
            (error : any) => {
                console.log(error);
            }
        );
    }

    public GetBairro(){
        new VpHttp('http://5c649d4cc969210014a32ec3.mockapi.io/bairro').get().subscribe(
            (data : any) => {
                data.forEach((element : any) => {
                    this.Bairro.push(element.Nome)
                   
                });
            this.perguntarDadosPedido();
            },
            (error : any) => {
                console.log(error);
            }
        );
    }
}