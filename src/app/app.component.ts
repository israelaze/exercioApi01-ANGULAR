import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './autenticacao/services/auth.service';
import { RecuperarsenhaService } from './recuperarSenha/services/recuperarsenha.service';
import { UsuariosService } from './usuarios/services/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //variavel na classe (atributo) para armazenar se o usuario esta ou nao autenticado
  isLoggedIn = false;

  //mensagens
  mensagemErro2 = {
    message: '',
    code: '',
    status: '',
    objectName: '',
    errors: [
      {
        message: '',
        field: '',
        parameter: ''
      }
    ]
  };

  errors = [];

  
  mensagemErro = '';
  mensagemSucesso = '';

  // objeto para armazenar os dados do usuario autenticado.. 
  usuario = {
    idUsuario: 0,
    nome: '',
    email: '',
    accessToken: ''
  };


  //injeção de dependencia..
  constructor(private authService: AuthService,
    private usuariosService: UsuariosService,
    private recuperarsenhaServie: RecuperarsenhaService) { }

  //método executado antes do componente ser carregado..
  ngOnInit(): void {

    //verificar se há um usuario autenticado..
    this.isLoggedIn = localStorage.getItem('AUTH') != null;

    //se o usuario estiver autenticado, vamos ler os dados do usuario
    if (this.isLoggedIn) {
      this.usuario = JSON.parse(localStorage.getItem('AUTH') as any);
    }
  }

  //função para processar o SUBMIT do formulário de Autenticação
  autenticar(formLogin: any): void {

    this.authService.autenticar(formLogin.form.value)
      .subscribe( //resposta da API..
        (data) => {

          //gravar os dados do usuario em uma localStorage..
          this.usuario = (data as any);
          localStorage.setItem("AUTH", JSON.stringify(this.usuario));

          //limpar a mensagem de erro
          this.mensagemErro ='';

          //recarregar a página..
          this.ngOnInit();
        },
        (e) => {
          console.log(e.error);
          //this.mensagemErro = this.errors;
          
        }
      )

    /*
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
      ) */
  }

  //encerrar sessão
  logout(): void {
    //apagar os dados em sessão
    localStorage.removeItem('AUTH');
    //recarregar a página
    this.ngOnInit();
  }


  //objeto para capturar os campos do formulário
  formCadastro = new FormGroup({

    //declarando o campo 'nome' do formulário
    nome: new FormControl('', [
      Validators.required, //campo obrigatório
      Validators.pattern('^[A-Za-zÀ-Üà-ü0-9\\s]{3,150}$') //expressão regular (REGEX)
    ]),

    //declarando o campo 'email' do formulário
    email: new FormControl('', [
      Validators.required, //torna o campo obrigatório
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') // expressão regular (REGEX)

    ]),

    //declarando o campo 'senha' do formulário
    senha: new FormControl('', [
      Validators.required, //campo obrigatório
      Validators.pattern('^[A-Za-zÀ-Üà-ü0-9\\s]{6,150}$') //expressão regular (REGEX)
    ])

  });

  //criando um objeto para utilizar o formulário na página
  get form(): any {
    return this.formCadastro.controls;
  }

  //FUNÇÃO PARA CADASTRAR USUÁRIOS
  cadastrarUsuario(): void {

    //limpar o conteudo das mensagens
    this.mensagemSucesso = '';
    this.mensagemErro = this.mensagemErro;

    //executando uma chamada POST para a API
    this.usuariosService.post(this.formCadastro.value)
      .subscribe(
        (data) => { //retorno de sucesso da API
          this.mensagemSucesso = data;
          //limpar os campos do formulario
          this.formCadastro.reset();
        },
        (e) => { //retorno de erro da API
          this.mensagemErro = e.error;
        }
      );
  }

  //FUNÇÃO PARA RECUPERAR SENHA
 //função para processar o SUBMIT do formulário de Autenticação
 recuperarSenha(formRecuperarSenha: any): void {

  this.recuperarsenhaServie.recuperar(formRecuperarSenha.form.value)
    .subscribe( //resposta da API..
      (data) => {

        //gravar os dados do usuario em uma localStorage..
        this.mensagemSucesso = (data as any);

        //limpar a mensagem de erro
      //  this.mensagemErro ='';

        //recarregar a página..
        this.ngOnInit();
      },
      (e) => {
        this.mensagemErro = e.error;
        
      }
    );
  }
}
