import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from './../services/clientes.service';

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

  ngOnInit(): void { }

  //objeto para capturar os campos do formulário
  formCadastro = new FormGroup({

    //declarando o campo 'nome' do formulário
    nome: new FormControl('', [
      Validators.required, //torna o campo obrigatório
      Validators.pattern(/\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/) //Regex para duas strings, separadas com espaço e com no mínimo 3 caracteres cada. Aceita acentuação e rejeita números.
    ]),

    //declarando o campo 'cpf' do formulário
    cpf: new FormControl('', [
      Validators.required, //torna o campo obrigatório
      Validators.pattern('^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$') // expressão regular (REGEX)

    ]),

    //declarando o campo 'email' do formulário
    email: new FormControl('', [
      Validators.required, //torna o campo obrigatório
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3,3}$') // expressão regular (REGEX)

    ])
  });

  //criando um objeto pra utilizar o formulário na página
  get form(): any {
    return this.formCadastro.controls;
  }

  //CADASTRAR
  cadastrar(): void {

    //limpar o conteúdo ds mensagens (sucesso ou erro)
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    this.clientesService.cadastrar(this.formCadastro.value)
      .subscribe(
        (data) => {
          this.mensagemSucesso = data;
          this.formCadastro.reset();
        },
        (e) => {
          this.mensagemErro = "O CPF informado já encontra-se cadastrado. Tente outro.";
        }
      )
  }
}
