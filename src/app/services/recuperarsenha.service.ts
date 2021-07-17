import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecuperarsenhaService {

  //atributo..
  endpoint = environment.apiUrl + "/recuperarsenha";

  constructor(private httpClient: HttpClient) { }

  post(email: string) {

    const formData = new FormData();
    formData.append('email', email);

    return this.httpClient.post(this.endpoint, formData, { responseType: 'text' })
  }
}
