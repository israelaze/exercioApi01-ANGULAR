import { Component, OnInit } from '@angular/core';
import { ClientesService} from '../services/clientes.service';

@Component({
  selector: 'app-consulta-clientes',
  templateUrl: './consulta-clientes.component.html',
  styleUrls: ['./consulta-clientes.component.css']
})
export class ConsultaClientesComponent implements OnInit {

  //atributos
    mensagemSucesso = "";
    mensagemErro = "";

    pesquisa =  "";

  //atributo para armazenar a listagem de clientes
   clientes = [ 
     {
       idCliente: 0,
       nome: '',
       cpf: '',
       email: ''
     }
  ];

  //atributo para armazenar os dados de apenas 1 Cliente
  cliente = {
      idCliente: 0,
      nome: '',
      cpf: '',
      email: ''
    }
 

  //atributo para armazenar a página atual do componente de paginação
  page = 1;

  //injeção de dependência
  constructor(private clientesService : ClientesService) { }

  //função executada quando o componente é carregado
  ngOnInit(): void {  //abrir o componente...
    
    //já abre consultando os clientes na API
    this.clientesService.get()
      .subscribe(     //callback da API (retorno)
        (data) => {   //atribui o retorno que a API devolve em forma de lista (Array) json na variável data
          this.clientes = (data as any[]); //carrega uma lista de clientes na variável clientes(atributo)
        },
        (e) => {  //resposta de erro
          console.log(e);
        }
      )
  }

  //função para buscar 1 cliente na API através Id (getById)
  obterCliente(idCliente : number) : void {

    this.mensagemSucesso = "";
    this.mensagemErro = "";

    //consultar o cliente na API pelo Id
    this.clientesService.getById(idCliente)
      .subscribe(
        (data) => {
          this.cliente = (data as any);
        },
        (e) => {
          console.log(e);
        }
      )
  }

  //função para excluir o cliente na API
  excluirCliente(idCliente : number) : void {
    //fazendo uma chamada ao serviço de exlusão da API
    this.clientesService.delete(idCliente)
      .subscribe(
        (data) => {
          this.mensagemSucesso = data;
          this.ngOnInit(); //executando a consulta
        },
        (e) => {
          this.mensagemErro = e.error;         
        }
      )
  }

  //função para atualizar um cliente
  atualizarCliente(formEdicao : any) : void {
    //fazendo uma chamada para o serviço de edição da API
    this.clientesService.put(formEdicao.form.value)
      .subscribe(
        (data) => {
          this.mensagemSucesso = data;
          this.ngOnInit();    //executando a consulta
        },
        (e) => {
          console.log(e);
          this.mensagemErro = e.error;
        }
      )
  }

  //função para realizar paginação(avançar ou voltar)
  handlePageChange(event : number){
    this.page = event;
  }


}
