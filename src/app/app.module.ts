//UTILIZADO PARA HABILITAR TODOS OS MÓDULOS DO PROJETO ANGULAR

//importando a biblioteca para consumo de APIs
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
//importando a biblioteca para desenvolvimento de formulários
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
//importando as bibliotecas para mapeamento de rotas
import { RouterModule, Routes } from '@angular/router';
//importando o módulo de filtro de pesquisa
import { Ng2SearchPipeModule } from 'ng2-search-filter';
//importando a bilbioteca para paginação de dados
import { NgxPaginationModule } from 'ngx-pagination';
//páginas(componentes) do projeto
import { AppComponent } from './app.component';
import { CadastroClientesComponent } from './clientes/cadastro-clientes/cadastro-clientes.component';
import { ConsultaClientesComponent } from './clientes/consulta-clientes/consulta-clientes.component';
import { PainelPrincipalComponent } from './painel-principal/painel-principal.component';
import { TokenInterceptor } from './_interceptors/tokenInterceptor';
import { UsuariosComponent } from './usuarios/usuarios.component';



// mapeando as rotas (URLs) para cada componente(página) do projeto
const routes: Routes = [
  { path: 'painel-principal', component: PainelPrincipalComponent },
  { path: 'cadastro-clientes', component: CadastroClientesComponent },
  { path: 'consulta-clientes', component: ConsultaClientesComponent },
  { path: 'root', component: AppComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    PainelPrincipalComponent,
    CadastroClientesComponent,
    ConsultaClientesComponent,
    UsuariosComponent
  ],
  // defini tudo o que será usado no projeto
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), // registrando as rotas mapeadas para o projeto
    HttpClientModule,              //registrando a biblioteca para consumo de API
    FormsModule, ReactiveFormsModule, // registrando a biblioteca de formulários
    NgxPaginationModule,                 //registrando a biblioteca de paginação
    Ng2SearchPipeModule           // registrando a biblioteca de filtro

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, 
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
