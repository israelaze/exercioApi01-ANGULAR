import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //capturando os dados do usuario autenticado
        var usuario = JSON.parse(localStorage.getItem('AUTH') as any);

        //verificando se a requisição feita para a API não é autenticação de usuário
        if (!request.url.includes("/api/auth")) {
            request = request.clone({
                setHeaders: { //adiciona um cabeçalho na requisição
                    //enviando o TOKEN de autorização
                    Authorization: `Bearer ${usuario.accessToken}`
                }
            })
        }

        return next.handle(request);
    }
}

