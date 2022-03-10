import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Email } from '../model/recuperarSenha.model';


@Injectable({
  providedIn: 'root'
})
export class RecuperarSenhaService {

  // URL API WEB
  endpoint = environment.baseUrl + "/recuperarsenha";

  // INJEÇÃO DE DEPENDÊNCIA
  constructor(private httpClient: HttpClient) { }

  // RECUPERAR
  recuperar(email: string) {
    return this.httpClient.post(this.endpoint, email, { responseType: 'text' });
  }

}
