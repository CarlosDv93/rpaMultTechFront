import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../model/pedido.model';
import { map } from 'rxjs/operators';

@Injectable()
export class PedidoService {

    private url_api = 'http://localhost:8080/pedido'

    constructor(private httpClientModule: HttpClientModule,
        private http: HttpClient) {
    }

    
    public salvarPedido(pedido: Pedido){
        return this.http.post<Pedido>(`${this.url_api}/`, pedido, {observe: 'response'}).pipe(
            map((retorno: HttpResponse<Pedido>) => {
                console.log("Pedido salvar: ", retorno)
                return retorno;
            })
        )
    }

}
