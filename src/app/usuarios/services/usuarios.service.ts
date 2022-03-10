import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  //atributo do endereço do endpoint(API)
  endpoint = environment.baseUrl + "/usuarios";

  //injeção de dependência
  constructor(private httpClient: HttpClient) { }

  //método para chamar o serviço POST (cadastro de usuários)
  cadastrar(usuario: Usuario) {
    return this.httpClient.post(this.endpoint, usuario, { responseType: 'text' })
  }
}