import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UsuariosService } from './services/usuarios.service';

@Injectable({
  providedIn: 'root'
})

//implementando a interface
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private usuariosService: UsuariosService) {}

  // um guarda que decide se uma rota pode ser ativada
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

   //buscar um token em localStorage
   const token = window.localStorage.getItem('AUTH') as any;

   //se true=> usuário autenticado, continue a navegação
   if (token) {
     return true;

   //se false=>  redireciona pra tela de login
   } else {
     this.router.navigate(['login']);
     return false;
   }
 }

}

