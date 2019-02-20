import { prompt } from 'inquirer';
import { VpHttp } from './http/vphttp';

export class Prova{
    private Categorias : any = null;
    private Produtos : any = null;
    private Dados : any = null;

    public Prova(){
        this.getCategoria();
        this.getProduto();
    }

    private Perguntas() {
        prompt (
            [
                {
                    name: 'name',
                    type: 'input',
                    message: 'Nome:',
                },
                {
                    name: 'esproduto',
                    type: 'list',
                    message: 'Escolha um produto',
                    choices: this.Produtos,
                },
                {
                    name: 'esccategoria',
                    type: 'list',
                    message: 'Escolha uma categoria',
                    choices: this.Categorias,
                }
            ]
        )
    }

    private Imprimir(){
        console.log(
            `\nOlá ${this.Dados.name}` +
            `\nSua categoria é: ${this.Dados.esccategoria}` +
            `\n Seu produto é: ${this.Dados.esproduto}` 
        );
    }

    public getCategoria(){
        new VpHttp('http://5c6c7c8fd51de300146f5b78.mockapi.io/Categoria').get().subscribe(
        (data : any) => {
            data.array.forEach((element : any ) => {
                this.Categorias.push(element.name)              
            });
           // this.getProduto();
        },
        (error : any) => {
            console.log(error);
        }
    }
}
