//UTILIZADO PARA HABILITAR TODOS OS MÓDULOS DO PROJETO ANGULAR

//módulos
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
//páginas(componentes) do projeto
import { AppComponent } from './app.component';
import { CadastroClientesComponent } from './clentes/cadastro-clientes/cadastro-clientes.component';
import { ConsultaClientesComponent } from './clentes/consulta-clientes/consulta-clientes.component';
import { AutenticacaoComponent } from './layout/autenticacao/autenticacao.component';
import { HomeComponent } from './layout/home/home.component';
import { CadastroUsuariosComponent } from './usuarios/cadastro-usuarios/cadastro-usuarios.component';
import { LoginComponent } from './usuarios/login/login.component';
//interceptores
import { httpInterceptorProviders } from './_interceptors';



@NgModule({
  declarations: [
    AppComponent,
    AutenticacaoComponent,
    HomeComponent,
    LoginComponent,
    CadastroClientesComponent,
    ConsultaClientesComponent,
    CadastroUsuariosComponent
    
  ],
  // defini tudo o que será usado no projeto
  imports: [
    BrowserModule,         
    FormsModule,                         
    ReactiveFormsModule, 
    NgxPaginationModule,                 
    Ng2SearchPipeModule,      
	  AppRoutingModule,
    HttpClientModule
    
  ],
  //provedores de interceptação
  providers: [
    httpInterceptorProviders
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
