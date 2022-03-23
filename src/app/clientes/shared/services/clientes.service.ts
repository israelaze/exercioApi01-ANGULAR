import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cliente } from '../model/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  // URL API WEB
  endpoint = environment.baseUrl + "/clientes";

  // INJEÇÃO DE DEPENDÊNCIA
  constructor(private httpClient: HttpClient) { }

  // CADASTRAR
  cadastrar(cliente: Cliente) {
    return this.httpClient.post(this.endpoint, cliente, { responseType: 'json' });
  }

  // BUSCAR TODOS
  buscarTodos() {
    return this.httpClient.get(this.endpoint, { responseType: 'json' });
  }

  // BUSCAR ID
  buscarId(idCliente: number) {
    return this.httpClient.get(this.endpoint + "/" + idCliente, { responseType: 'json' });
  }

  // ATUALIZAR
  atualizar(cliente: Cliente) {
    return this.httpClient.put(this.endpoint, cliente, { responseType: 'text' })
  }

  // EXCLUIR
  excluir(idCliente: number) {
    return this.httpClient.delete(this.endpoint + "/" + idCliente, { responseType: 'text' })
  }

}