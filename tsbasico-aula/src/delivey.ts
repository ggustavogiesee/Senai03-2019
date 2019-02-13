import { prompt } from 'inquirer';

export class Delivery {
    private dadosPedido : any = null;
    private dadosEntrega : any = null;

    public fazerPedido() {
        this.perguntarDadosPedido();
    }

    private perguntarDadosPedido() {
        prompt (
            [
                {
                    name: 'name',
                    type: 'input',
                    message: 'Nome:',
                },
                {
                    name: 'telephone',
                    type: 'input',
                    message: 'Telephone:',
                },
                {
                    name: 'size',
                    type: 'list',
                    message: 'Tamanho da Pizza:',
                    choices: ['Pequena', 'Média', 'Grande'],
                    default: 0,
                },
                {
                    name: 'flavor',
                    type: 'list',
                    message: 'Sabor da Pizza:',
                    choices: ['Brócolis', 'Filé Migon', 'Alho e Oleo', 'Portuguesa', 'Seis queijos'],
                    default: 0,
                },
                {   
                    name: 'qtde',
                    type: 'input',
                    message: 'Quantidade:',
                    default: 1
                },
                {
                    name: 'deliver',
                    type: 'list',
                    message: 'Entregar?',
                    choices: ['Sim', 'Não']
                }
            ]
        ).then(
            (pedido : any) => {
                this.dadosPedido = pedido;

                if (pedido.Delivery == 'Sim') {
                    this.perguntarDadosEntrega();
                } else {
                    this.imprimirRelatorio();
                }
            }
         )
    }

    private perguntarDadosEntrega() {
        prompt (
            [
                {
                    name: 'city',
                    type: 'input',
                    message: 'Cidade:'
                },
                {
                    name: 'neighborhood',
                    type: 'input',
                    message: 'Bairro:'
                },
                {
                    name: 'street',
                    type: 'input',
                    message: 'Rua:'
                },
                {
                    name: 'number',
                    type: 'input',
                    message: 'Número:'
                },
                {
                    name: 'complement',
                    type: 'input',
                    message: 'Complemento:'
                }
            ]
        ).then(
            (entrega : any) => {
                this.dadosEntrega = entrega;

                this.imprimirRelatorio();
            }
        )
    }

    private imprimirRelatorio() {
        console.log(
            `\nOlá: ${this.dadosPedido.name}` +
            `\nSeu número de telefone é: ${this.dadosPedido.telephone}` +
            `\nO Tamanho solicitado foi: ${this.dadosPedido.size}` +
            `\nSeu sabor é: ${this.dadosPedido.flavor}` +
            `\nQuantidade pedida foi: ${this.dadosPedido.qtde}` +
            `\nDeseja efetuar entrega? ${this.dadosPedido.deliver}`
        );

        if (this.dadosEntrega != null) {
            console.log(
                `\nA cidade é: ${this.dadosEntrega.city}` +
                `\nSeu bairro é: ${this.dadosEntrega.neighborhood}` +
                `\nRua seria: ${this.dadosEntrega.street}` +
                `\nO número da casa é: ${this.dadosEntrega.number}` +
                `\nseu Complemento: ${this.dadosEntrega.complement}`);
        }
    }
};

new Delivery().fazerPedido();