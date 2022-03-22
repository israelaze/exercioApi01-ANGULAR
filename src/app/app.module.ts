//UTILIZADO PARA HABILITAR TODOS OS MÓDULOS DO PROJETO ANGULAR

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
//importando o módulo de filtro de pesquisa
import { Ng2SearchPipeModule } from 'ng2-search-filter';
//importando a bilbioteca para paginação de dados
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
//páginas(componentes) do projeto
import { AppComponent } from './app.component';
import { AutenticacaoComponent } from './layout/autenticacao/autenticacao.component';
import { HomeComponent } from './layout/home/home.component';
import { CadastroUsuariosComponent } from './usuarios/cadastro-usuarios/cadastro-usuarios.component';
import { LoginComponent } from './usuarios/login/login.component';
// interceptor
import { TokenInterceptor } from './_interceptors/tokenInterceptor';


@NgModule({
  declarations: [
    AppComponent,
    AutenticacaoComponent,
    HomeComponent,
    LoginComponent,
    CadastroUsuariosComponent
  ],
  // defini tudo o que será usado no projeto
  imports: [
    BrowserModule,           //registrando a biblioteca para consumo de API
    FormsModule, ReactiveFormsModule, // registrando a biblioteca de formulários
    NgxPaginationModule,                 //registrando a biblioteca de paginação
    Ng2SearchPipeModule,         // registrando a biblioteca de filtro
	  AppRoutingModule,
    HttpClientModule
    
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor, 
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
