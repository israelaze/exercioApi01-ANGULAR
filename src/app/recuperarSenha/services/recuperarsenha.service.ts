import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/usuarios/model/usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecuperarsenhaService {

  //atributo..
  endpoint = environment.baseUrl + "/recuperarsenha";

  constructor(private httpClient: HttpClient) { }

  recuperar(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.endpoint, usuario);
  }          

  /*
  recuperar(email: string) {

    const formData = new FormData();
    formData.append('email', email);

    return this.httpClient.post(this.endpoint, formData, { responseType: 'text' })
  } */
}
