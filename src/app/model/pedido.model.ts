export class Pedido {
    public id : number;
    public nome : string;
    public valor: number;
    public qtde: number;
    public item: string;
    
    constructor(id:number, nome:string, item: string, valor:number, qtde: number){
        this.valor = valor;
        this.id = id;
        this.nome = nome;
        this.item = item;
        this.qtde = qtde;
    }

}