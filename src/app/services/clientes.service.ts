//ARQUIVO QUE CONTÉM AS FUNÇÕES PARA QUE O ANGULAR FAÇA AS REQUISIÇÕES(CHAMADAS) PARA API.

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  //atributo
  endpoint = environment.apiUrl + "/clientes";

  //injeção de dependência
  constructor(private httpClient: HttpClient) { }

  //método para chamar o serviço POST (cadastro)
  post(cliente:any){

    const formData = new FormData();
      formData.append('nome', cliente.nome);
      formData.append('cpf', cliente.cpf);
      formData.append('email', cliente.email);
    return this.httpClient.post(this.endpoint, formData, { responseType: 'text'}) //faz uma chamada para api do tipo post, passando url(endpoint do serviço) e os dados do cliente
  }                                                                                //retornando um texto

  //método para chamar o serviço PUT (edição)
  put(cliente:any){

    const formData = new FormData();
      formData.append('idCliente', cliente.idCliente);
      formData.append('nome', cliente.nome);
      formData.append('cpf', cliente.cpf);
      formData.append('email', cliente.email);
    return this.httpClient.put(this.endpoint, formData, { responseType: 'text'})
  }

  //método para chamar o serviço DELETE (exclusão)
  delete(idCliente : number){
    return this.httpClient.delete(this.endpoint + "/" + idCliente, {responseType: 'text'})
  }

  //método para chamar o serviço GET (consulta)
  get(){
    return this.httpClient.get(this.endpoint);
  }

  //método para chamar o serviço GET pelo Id do CLiente
  getById(idCliente : number) {
    return this.httpClient.get(this.endpoint + "/" + idCliente);
  }


}
