//UTILIZADO PARA HABILITAR TODOS OS MÓDULOS DO PROJETO ANGULAR

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//páginas(componentes) do projeto
import { AppComponent } from './app.component';
import { PainelPrincipalComponent } from './painel-principal/painel-principal.component';
import { CadastroClientesComponent } from './cadastro-clientes/cadastro-clientes.component';
import { ConsultaClientesComponent } from './consulta-clientes/consulta-clientes.component';

//importando as bibliotecas para mapeamento de rotas
import {Routes, RouterModule} from '@angular/router';

//importando a biblioteca para consumo de APIs
import { HttpClientModule} from '@angular/common/http';

//importando a biblioteca para desenvolvimento de formulários
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//importando a bilbioteca para paginação de dados
import { NgxPaginationModule } from 'ngx-pagination';

//importando os interceptors
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './_interceptors/tokenInterceptor';

//importando o módulo de filtro de pesquisa
import { Ng2SearchPipeModule } from 'ng2-search-filter';

// mapeando as rotas (URLs) para cada componente(página) do projeto
const routes : Routes = [
  { path : 'painel-principal', component : PainelPrincipalComponent },
  { path : 'cadastro-clientes', component : CadastroClientesComponent},
  { path : 'consulta-clientes', component : ConsultaClientesComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    PainelPrincipalComponent,
    CadastroClientesComponent,
    ConsultaClientesComponent
  ],
  // defini tudo o que será usado no projeto
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), // registrando as rotas mapeadas para o projeto
    HttpClientModule,              //registrando a biblioteca para consumo de API
    FormsModule, ReactiveFormsModule, // registrando a biblioteca de formulários
    NgxPaginationModule,                 //registrando a biblioteca de paginação
    Ng2SearchPipeModule                   // registrando a biblioteca de filtro
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
