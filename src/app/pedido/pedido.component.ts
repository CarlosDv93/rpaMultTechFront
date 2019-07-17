import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs'; 
import { Pedido } from '../model/pedido.model';
import { PedidoService } from '../service/PedidoService';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
  providers: [ PedidoService ]
})
export class PedidoComponent implements OnInit {

  public formulario : FormGroup;
  public retorno: any;
  public primeiroAcesso: Boolean = true;
  public inseridoSucesso: Boolean = false;
  public atualizar : Boolean = false;
  public observable: Observable<HttpResponse<Pedido>>;

  constructor(private formBuilder: FormBuilder,
    private http : HttpClient,
    private pedService : PedidoService) { 

  }

  ngOnInit() {
    this.configurarFormulario();
  }

  public configurarFormulario() {
    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      valor: [null, [Validators.required, Validators.min(0.01)]],
      qtde: [null, [Validators.required, Validators.min(1)]],
      item: [null, [Validators.required, Validators.minLength(3)]]
    });
  }
  
  public options = { 
    headers: "'Content-Type':  'application/json', 'Access-Control-Allow-Origin': '*'",
    observe: 'response'
  };

  enviar(){
    console.log(this.formulario);
    this.atualizar = false;
    this.observable = this.pedService.salvarPedido(this.formulario.value as Pedido);

    this.observable.subscribe((retorno: any ) => {
      console.log("Retorno Inserção:", retorno)
      if(retorno.status === 201){
        this.inseridoSucesso = true;
        this.primeiroAcesso = false;
      }
      console.log("Retorno: ", retorno.status);
      this.atualizar = true;
    }, 
    (error : HttpErrorResponse) => {
      console.log("Error: " , error.status)
      this.inseridoSucesso = false;
      this.primeiroAcesso = false;
    })
    
    this.formulario.reset();
  }

}
