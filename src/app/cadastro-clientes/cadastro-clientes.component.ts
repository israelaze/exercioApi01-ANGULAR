import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClientesService} from '../services/clientes.service';


@Component({
  selector: 'app-cadastro-clientes',
  templateUrl: './cadastro-clientes.component.html',
  styleUrls: ['./cadastro-clientes.component.css']
})
export class CadastroClientesComponent implements OnInit {

  //atributos (campos)
  mensagemSucesso = '';
  mensagemErro = '';

  //inicialização por meio de injeção de dependencia
  constructor(private clientesService: ClientesService) { }

  ngOnInit(): void {
  }

  //objeto para capturar os campos do formulário
  formCadastro = new FormGroup({

    //declarando o campo 'nome' do formulário
    nome : new FormControl('', [
      Validators.required, //torna o campo obrigatório
      Validators.pattern('^[A-Za-zÀ-Üà-ü\\s]{3,150}$') // expressão regular (REGEX)

    ]),

    //declarando o campo 'cpf' do formulário
    cpf : new FormControl('', [
      Validators.required, //torna o campo obrigatório
      Validators.pattern('^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$') // expressão regular (REGEX)

    ]),

     //declarando o campo 'email' do formulário
     email : new FormControl('', [
      Validators.required, //torna o campo obrigatório
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') // expressão regular (REGEX)

    ])
  });

  //criando um objeto pra utilizar o formulário na página
  get form() : any{
    return this.formCadastro.controls;
  }

  //função executada no SUBMIT  do formulário
  cadastrarCliente(): void{

    //limpar o conteúdo ds mensagens (sucesso ou erro)
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    //executando uma chamada POST  para API
    this.clientesService.post(this.formCadastro.value)
      .subscribe(
        (data) => { //A variável data contém o retorno de sucesso da API 
          this.mensagemSucesso = data; // atribuindo o retorno da API na variável (mensagemSucesso)
          
          //limpar os campos do formulário logo após o Submit
          this.formCadastro.reset();
        },
        (e) => { //A variável e contém o retorno de erro da API 
          this.mensagemErro = e.error;
        }
      );
  }
}
