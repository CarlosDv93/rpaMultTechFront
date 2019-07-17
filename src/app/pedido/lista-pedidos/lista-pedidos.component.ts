import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../../model/pedido.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lista-pedidos',
  templateUrl: './lista-pedidos.component.html',
  styleUrls: ['./lista-pedidos.component.css']
})
export class ListaPedidosComponent implements OnInit {

  public pedidos : Pedido[];
  @Input() atualizar : Boolean;

  constructor(private http : HttpClient) { 
  }

  ngOnInit() {
    this.buscarPedidos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Add '${implements OnChanges}' to the class.
    console.log(changes)
    if(this.atualizar == true){
      this.atualizarLista();
      this.atualizar = false;
    }
  }

  buscarPedidos() : void {
    console.log("BuscarPedidos")
    this.http.get(`http://127.0.0.1:8080/pedido`)
      .subscribe((retorno: any ) => {
        console.log("Retorno buscarPed: ", retorno);
        console.log("typeof: ", typeof retorno);
        return this.pedidos = retorno;
      })
  }

  atualizarLista() {
    this.buscarPedidos();
  }

}
