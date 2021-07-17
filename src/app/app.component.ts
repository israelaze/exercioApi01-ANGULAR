import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsuariosService } from './services/usuarios.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //variavel na classe (atributo) para armazenar
  //se o usuario esta ou nao autenticado
  isLoggedIn = false;

  //mensagens
  mensagemErro = "";

  //objeto para armazenar os dados do usuario autenticado..
  usuario = {
    idUsuario: 0,
    nome: '',
    email: '',
    accessToken: ''
  };

  //inicialização por meio de injeção de dependencia
  constructor(private authService: AuthService) { }

  //método executado antes do componente ser carregado..
  ngOnInit(): void {

    //verificar se há um usuario autenticado..
    this.isLoggedIn = localStorage.getItem('AUTH') != null;

    //se o usuario estiver autenticado, vamos ler os dados do usuario
    if (this.isLoggedIn) {
      this.usuario = JSON.parse(localStorage.getItem('AUTH') as any);
    }
  }

  //função para processar o SUBMIT do formulário de autenticação...
  autenticar(formLogin: any): void {

    this.authService.post(formLogin.form.value)
      .subscribe( //resposta da API..
        (data) => {

          //gravar os dados do usuario em uma localStorage..
          this.usuario = (data as any);
          localStorage.setItem("AUTH", JSON.stringify(this.usuario));

          //limpar a mensagem de erro
          this.mensagemErro = "";

          //recarregar a página..
          this.ngOnInit();
        },
        (e) => {
          if (e.status == 401) {
            this.mensagemErro = "Usuário ou senha inválido.";
          }
          else {
            this.mensagemErro = "Erro ao autenticar usuario.";
          }
        }
      );
  }

  //encerrar sessão
  logout(): void {
    //apagar os dados em sessão
    localStorage.removeItem('AUTH');
    //recarregar a página
    this.ngOnInit();
  }

  /*
  //função para processar o SUBMIT do formulário cadastro de Usuário
  cadastrar(formLogin: any): void {

    this.usuariosService.post(formLogin.form.value)
      .subscribe( //resposta da API..
        (data) => {

          //gravar os dados do usuario em uma localStorage..
          this.usuario = (data as any);
          localStorage.setItem("AUTH", JSON.stringify(this.usuario));

          //limpar a mensagem de erro
          this.mensagemErro = "";

          //recarregar a página..
          this.ngOnInit();
        },
        (e) => {
          if (e.status == 401) {
            this.mensagemErro = "Usuário ou senha inválido.";
          }
          else {
            this.mensagemErro = "Erro ao autenticar usuario.";
          }
        }
      );
  }

  */

}
