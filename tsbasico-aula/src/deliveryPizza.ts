import { prompt } from 'inquirer';

export class Pizzaria {
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

                if (pedido.deliver == 'Sim') {
                    this.perguntarDadosEntrega();
                } else {
                    this.relatorio();
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

                this.relatorio();
            }
        )
    }

    private relatorio() {
        console.log(
            `\nNome: ${this.dadosPedido.name}` +
            `\nTelefone: ${this.dadosPedido.telephone}` +
            `\nTamanho: ${this.dadosPedido.size}` +
            `\nSabor: ${this.dadosPedido.flavor}` +
            `\nQuantidade: ${this.dadosPedido.qtde}` +
            `\nEntregar: ${this.dadosPedido.deliver}`
        );

        if (this.dadosEntrega != null) {
            console.log(
                `\nCidade: ${this.dadosEntrega.city}` +
                `\nBairro: ${this.dadosEntrega.neighborhood}` +
                `\nRua: ${this.dadosEntrega.street} - nº ${this.dadosEntrega.number}` +
                `\nComplemento: ${this.dadosEntrega.complement}`);
        }
    }
};

new Pizzaria().fazerPedido();