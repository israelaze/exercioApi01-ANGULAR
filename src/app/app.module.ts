//UTILIZADO PARA HABILITAR TODOS OS MÓDULOS DO PROJETO ANGULAR

//módulos
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { LoginComponent } from './usuarios/login/login.component';

// interceptor
import { TokenInterceptor } from './_interceptors/tokenInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    AutenticacaoComponent,
    HomeComponent,
    LoginComponent,
    CadastroClientesComponent,
    ConsultaClientesComponent
    
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
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor, 
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
