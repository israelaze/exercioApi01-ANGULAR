import { Component, OnInit } from '@angular/core';
import { AuthService } from './autenticacao/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //atributo para armazenar se o usuario está ou não autenticado
  isLoggedIn = false;

  //mensagens
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

  //objeto para capturar os campos do formulário
  formLogin = new FormGroup({

    //declarando o campo 'email' do formulário
    email: new FormControl('', [
      Validators.required, //torna o campo obrigatório
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3,3}$') // expressão regular (REGEX)

    ]),

    //declarando o campo 'senha' do formulário
    senha: new FormControl('', [
      Validators.required, //campo obrigatório
      Validators.pattern('^[A-Za-zÀ-Üà-ü0-9\\s]{4,150}$') //expressão regular (REGEX)
    ])

  });

  //criando um objeto pra utilizar o formulário na página
  get form(): any {
    return this.formLogin.controls;
  }

  //AUTENTICAR
  autenticar(): void {
      this.authService.autenticar(this.formLogin.value)
      .subscribe( 
        (data) => {

          //gravar os dados do usuario em uma localStorage..
          this.usuario = (data as any);
          localStorage.setItem("AUTH", JSON.stringify(this.usuario));

          //limpar a mensagem de erro
          this.mensagemErro = '';

          //recarregar a página..
          this.ngOnInit();
        },
        (e) => {
          console.log(e.error.message);
          this.mensagemErro = e.error.message;

        }
      )
    
  }

  //LOGOUT
  logout(): void {
    //apagar os dados em sessão
    localStorage.removeItem('AUTH');

    //limpando os dados no formulário
    this.formLogin.reset();

    //recarregar a página
    this.ngOnInit();
  }

}



/*
  //FUNÇÃO PARA CADASTRAR USUÁRIOS

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

  cadastrar(): void {

    //limpar o conteudo das mensagens
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    this.usuariosService.cadastrar(this.formCadastro.value)
      .subscribe(
        (data) => { //retorno de sucesso da API
          this.mensagemSucesso = data;
          this.formCadastro.reset();
        },
        (e) => { //retorno de erro da API
          this.mensagemErro = "O email informado já encontra-se cadastrado, por favor tente outro.";
        }
      )
  }

  //FUNÇÃO PARA RECUPERAR SENHA
  formRecuperarSenha = new FormGroup({

    //declarando o campo 'email' do formulário
    email: new FormControl('', [
      Validators.required, //torna o campo obrigatório
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3,3}$') // expressão regular (REGEX)

    ])
  });

  //criando um objeto pra utilizar o formulário na página
  get form2(): any {
    return this.formRecuperarSenha.controls;
  }

  recuperar(): void {

    //limpar o conteúdo ds mensagens (sucesso ou erro)
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    this.recuperarSenhaService.recuperar(this.formRecuperarSenha.value)
      .subscribe(
        (data) => {
          console.log(this.form2.value)
          this.mensagemSucesso = data;
          this.formRecuperarSenha.reset();
        },
        (e) => {
          this.mensagemErro = e as any;
        }
      )
  } */