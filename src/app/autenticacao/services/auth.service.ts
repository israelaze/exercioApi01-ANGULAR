import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/usuarios/model/usuario';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //atributo
  endpoint = environment.baseUrl + "/auth";

  //injeção de dependencia (inicialização)
  constructor(private httpClient: HttpClient) { }

  //método para chamar o serviço POST (Auth) para autenticação de usuários
  autenticar(usuario: Usuario): Observable <Usuario> {

    return this.httpClient.post<Usuario>(this.endpoint, usuario);

   /* const formData = new FormData();

    formData.append('email', usuario.email);
    formData.append('senha', usuario.senha);

    return this.httpClient.post(this.endpoint, formData)*/
  }
}
