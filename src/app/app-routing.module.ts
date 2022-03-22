import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutenticacaoComponent } from './layout/autenticacao/autenticacao.component';
import { HomeComponent } from './layout/home/home.component';
import { CadastroUsuariosComponent } from './usuarios/cadastro-usuarios/cadastro-usuarios.component';
import { LoginComponent } from './usuarios/login/login.component';
import { AuthGuard } from './usuarios/shared/auth.guard';


const routes: Routes = [ 
  { path: '', 
    component: HomeComponent, 
    canActivate: [AuthGuard]
  },

  { path: '', 
    component: AutenticacaoComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'cadastro-usuarios', component: CadastroUsuariosComponent }
    ]
  }
 // { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
