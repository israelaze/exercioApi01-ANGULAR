import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../services/clientes.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-consulta-clientes',
  templateUrl: './consulta-clientes.component.html',
  styleUrls: ['./consulta-clientes.component.css']
})
export class ConsultaClientesComponent implements OnInit {

  //atributos
  mensagemSucesso = '';
  mensagemErro = '';

  //defini o campo de pesquisa como uma string vazia
  pesquisa = "";

  //armazena a página atual do componente de paginação
  page = 1;

  //atributo para armazenar a listagem de clientes
  clientes = [
    {
      idCliente: 0,
      nome: '',
      cpf: '',
      email: ''
    }
  ]

  //atributo para armazenar os dados de apenas 1 Cliente
  cliente = {
    idCliente: 0,
    nome: '',
    cpf: '',
    email: ''
  }

  // INJEÇÃO DE DEPENDÊNCIA
  constructor(private clientesService: ClientesService) { }

  //objeto para capturar os campos do formulário
  formEdicao = new FormGroup({

    //declarando o campo 'idCliente' do formulário
    idCliente: new FormControl([]),

    //declarando o campo 'nome' do formulário
    nome: new FormControl('', [
      Validators.required, //torna o campo obrigatório
      Validators.pattern(/\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/)

    ]),

    //declarando o campo 'email' do formulário
    cpf: new FormControl([]),

    //declarando o campo 'email' do formulário
    email: new FormControl('', [
      Validators.required, //torna o campo obrigatório
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') // expressão regular (REGEX)

    ])
  });

  get form(): any {
    return this.formEdicao.controls;
  }
  //FUNÇÃO EXECUTADA QUANDO O COMPONENTE É CARREGADO
  ngOnInit(): void { //abrir o componente..
    //executando a consulta de colaboradores na API..
    this.clientesService.buscarTodos()
      .subscribe( //callback da API (retorno)
        (data) => { //resposta de sucesso
          this.clientes = (data as any[]);
        },
        (e) => { //resposta de erro
          console.log(e);
        }
      )
  }

  // BUSCAR ID
  buscarId(idCliente: number): void {

    // limpando mensagens
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    this.clientesService.buscarId(idCliente)
      .subscribe(
        (data) => {
          this.cliente = (data as any)
        },
        (e) => {
          console.log(e);
        }
      )
  }

  // ATUALIZAR
  atualizar(): void {
    this.clientesService.atualizar(this.formEdicao.value)
      .subscribe(
        (data) => {
          this.mensagemSucesso = data;
          this.ngOnInit();
        },
        (e) => {
          this.ngOnInit();
          this.mensagemErro = e.console.error();
        }
      )
  }

  // EXCLUIR
  excluir(idCliente: number): void {
    this.clientesService.excluir(idCliente)
      .subscribe(
        (data) => {
          this.mensagemSucesso = data;
          this.ngOnInit();
        },
        (e) => {
          // limpando mensagens
          this.mensagemSucesso = '';
          this.mensagemErro = '';
          
          console.log(e.error)
          this.mensagemErro = 'Cliente não encontrado';
          
        }
      )
  }

  // PAGINAÇÃO
  handlePageChange(event: number) {
    this.page = event;
  }

}
