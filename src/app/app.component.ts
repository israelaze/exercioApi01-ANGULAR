import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './usuarios/autenticacao/services/auth.service';
import { UsuariosService } from './usuarios/services/usuarios.service';

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
  authGet = {
    idUsuario: 0,
    nome: '',
    email: '',
    accessToken: ''
  };

  // objeto para armazenar os dados do usuário capturados no formulário .. 
  authPost = {
    email: '',
    senha: ''
  };

  //injeção de dependencia..
  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private usuariosService: UsuariosService) { }

  //método executado antes do componente ser carregado..
  ngOnInit(): void {

    //verificar se há um usuario autenticado..
    this.isLoggedIn = localStorage.getItem('AUTH') != null;

    //se o usuario estiver autenticado, vamos ler os dados do usuario
    if (this.isLoggedIn) {
      this.authGet = JSON.parse(localStorage.getItem('AUTH') as any);
    }
  }

  //objeto para capturar os campos do formulário
  formLogin = this.formBuilder.group({
    email: ['',
      [Validators.required, //campo obrigatório
      Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3,3})+$/) //expressão regular (REGEX)
      ]],

    senha: ['',
      [Validators.required,
      Validators.pattern('^[A-Za-zÀ-Üà-ü0-9\\s]{4,6}$')
      ]]

  });

  //criando um objeto pra validar o formulário na página
  get login(): any {
    return this.formLogin.controls;
  }

  //AUTENTICAR
  autenticar(): void {
    this.authPost = this.formLogin.value;

    this.authService.autenticar(this.authPost)
      .subscribe(
        (data) => {

          //gravar os dados do usuario em uma localStorage..
          this.authGet = (data as any);
          localStorage.setItem("AUTH", JSON.stringify(this.authGet));

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

  //FUNÇÃO PARA CADASTRAR USUÁRIOS

  
  // objeto para armazenar os dados do usuário capturados no formulário .. 
  usuarioPost = {
    nome: '',
    email: '',
    senha: ''
  };

   //objeto para capturar os campos do formulário
   formCadastro = this.formBuilder.group({
    nome: ['',
      [ Validators.required, //campo obrigatório
        Validators.pattern('^[A-Za-zÀ-Üà-ü0-9\\s]{3,150}$') 
      ]],

    email:  ['',
      [ Validators.required, //campo obrigatório
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3,3}$')
      ]],

    senha: ['',
      [ Validators.required,
        Validators.pattern('^[A-Za-zÀ-Üà-ü0-9\\s]{4,6}$')
      ]]

  });

  //criando um objeto pra validar o formulário na página
  get form(): any {
    return this.formCadastro.controls;
  }

  cadastrar(): void {

    //limpar o conteudo das mensagens
    //this.mensagemSucesso = '';
   // this.mensagemErro = '';
    this.usuarioPost = this.formCadastro.value;

    console.log(this.usuarioPost);

    this.usuariosService.cadastrar(this.formCadastro.value)
      .subscribe(
        (data) => { 
          //this.mensagemSucesso = data;
        //  this.formCadastro.reset();
        },
        (e) => { 
         // this.mensagemErro = e.error;
        }
      )
  }
}
/*
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