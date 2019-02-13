import { prompt } from 'inquirer';
export class Perguntas {

    private dadosDaEntrega(){

    }

    private relatorio(){

    }

    public deliveryPizza() {

        prompt ([
            {
                name: 'name',
                type: 'input',
                message: 'Qual seu nome?'
            },
            {
                name: 'phone',
                type: 'input',
                message: 'Qual seu telefone?'
            },
            {
                name: 'pizzaSize',
                type: 'list',
                message: 'Qual o tamanho da pizza ideal?',
                choices: ['Pequena', 'Media', 'Grande'],
                default: 0
            },
        {
            name: 'flavor',
            type: 'list',
            message: 'Selecione um sabor para sua pizza:',
            choices: ['Brócolis', '4 Queijos', 'Marquerita', 'Bacon', 'Camarão', 'Portuguesa'],
            default: 0
        },
        {
            name: 'qtde',
            type: 'input',
            message: 'Quantidade:',
            default: 1
        },
        {
            name: 'delivery',
            type: 'list',
            message: 'Entregar?',
            choices: ['Sim', 'Não'],
            default: 0
        }
            
        ]).then(
            (answers: any) => {
                if (answers.answers === 'Sim'){
                    this,this.dadosDaEntrega();
                } else {
                    this.relatorio();
                }

                if (answers.answers === 'Sim')
                prompt ([
                    {
                    name: 'city',
                    type: 'input',
                    message: 'Qual sua cidade?'
                    },
                    {
                        name: 'neighborhood',
                        type: 'inpuit',
                        message: 'Qual seu bairro?',
                    },
                    {
                        name: 'street',
                        type: 'input',
                        message: 'Qual sua rua?'
                    },
                    {
                        name: 'number', 
                        type: 'input',
                        message: 'Qual o numero da casa?'
                    },
                    {
                        name: 'complement',
                        type: 'input',
                        message: 'Complemento:'
                    }
                ]).then (
                    (answers: any) => {
                        if (answers.answers === 'Sim')
                        {
                        console.log(`\n
                        Nome: ${answers.name}\n
                        Telefone: ${answers.phone}\n
                        Tamanho: ${answers.pizzaSize}\n
                        Sabor: ${answers.flavor}\n
                        Quanatidade: ${answers.qtde}\n
                        Entrega: ${answers.delivery}\n`)
                        }
                        else {
                            console.log(`\n
                            Nome: ${answers.name}\n
                            Telefone: ${answers.phone}\n
                            Tamanho: ${answers.pizzaSize}\n
                            Sabor: ${answers.flavor}\n
                            Quanatidade: ${answers.qtde}\n
                            Entrega: ${answers.delivery}\n`)
        
                        }
                    }

                )
            }
       
        )

    }
}

new Perguntas().deliveryPizza();