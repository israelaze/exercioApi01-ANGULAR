import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthPost } from 'src/app/usuarios/autenticacao/model/authPost.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // URL API WEB
  endpoint = environment.baseUrl + "/auth";

  // INJEÇÃO DE DEPENDÊNCIA
  constructor(private httpClient: HttpClient) { }

  // AUTENTICAR
  autenticar(authPost: AuthPost){
    return this.httpClient.post(this.endpoint, authPost);

  }
}
