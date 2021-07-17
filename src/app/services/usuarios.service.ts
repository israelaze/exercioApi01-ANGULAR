import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  //atributo do endereço do endpoint(API)
  endpoint = environment.apiUrl + "/usuarios";

  //injeção de dependência
  constructor(private httpClient: HttpClient) { }

  //método para chamar o serviço POST (cadastro de usuários)
  post(usuario: any){

    const formData = new FormData();

    formData.append('nome', usuario.nome);
    formData.append('email', usuario.email);
    formData.append('senha', usuario.senha);

    return this.httpClient.post(this.endpoint, formData, {responseType: 'text'})

  }

  //método para chamar o serviço DELETE (exclusão)
  delete(idUsuario: number){
    return this.httpClient.delete(this.endpoint + "/" + idUsuario, {responseType: 'text'})
  }

  //método para chamar o serviço GET (consulta)
  get(){
    return this.httpClient.get(this.endpoint);
  }

  //método para chamar o serviço GET pelo Id do Usuário
  getById(idUsuario : number) {
    return this.httpClient.get(this.endpoint + "/" + idUsuario);
  }


}
