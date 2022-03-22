import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroClientesComponent } from './clentes/cadastro-clientes/cadastro-clientes.component';
import { ConsultaClientesComponent } from './clentes/consulta-clientes/consulta-clientes.component';
import { AutenticacaoComponent } from './layout/autenticacao/autenticacao.component';
import { HomeComponent } from './layout/home/home.component';
import { PainelPrincipalComponent } from './painel-principal/painel-principal.component';
import { CadastroUsuariosComponent } from './usuarios/cadastro-usuarios/cadastro-usuarios.component';
import { LoginComponent } from './usuarios/login/login.component';
import { AuthGuard } from './usuarios/shared/auth.guard';


const routes: Routes = [ 
  //rota pai (carrega o componente principal)
  { path: '', 
    component: HomeComponent, 
    //rotas filhas (carregam dentro do componente principal)
    children: [
      { path: 'painel-principal', component: PainelPrincipalComponent },
      { path: 'cadastro-clientes', component: CadastroClientesComponent },
      { path: 'consulta-clientes', component: ConsultaClientesComponent},
    ],
    //guarda (decide se uma rota pode ser ativada)
    canActivate: [AuthGuard]
  },

  { path: '', 
    component: AutenticacaoComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'cadastro-usuarios', component: CadastroUsuariosComponent }
    ]
  },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
