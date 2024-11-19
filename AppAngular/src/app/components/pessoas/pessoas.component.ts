import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Pessoa} from "../../Pessoa";
import {PessoasService} from "../../pessoas.service";
import {$} from "protractor";

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {

  formulario: any;
  tituloFormulario: string;
  pessoas: Pessoa[];
  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;

  constructor(private pessoasService: PessoasService) { }

  ngOnInit(): void {

    this.pessoasService.ObterTodos().subscribe(resultado =>{
      this.pessoas = resultado;
    })
    this.tituloFormulario = 'Nova Pessoa';
    this.formulario = new FormGroup({
      nome: new FormControl(null),
      sobrenome: new FormControl(null),
      idade: new FormControl(null),
      profissao: new FormControl(null),
    });
  }

  ExibirFormularioCadastro(): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.tituloFormulario = 'Nova Pessoa';
    this.formulario = new FormGroup({
      nome: new FormControl(null),
      sobrenome: new FormControl(null),
      idade: new FormControl(null),
      profissao: new FormControl(null),
    });

  }

  ExibirFormularioAtualizacao(pessoaId): void {

    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.pessoasService.ObterByID(pessoaId).subscribe((resultado) => {
      this.tituloFormulario = `Atualizar ${resultado.nome} ${resultado.sobrenome}`;

      this.formulario = new FormGroup({
        pessoaId: new FormControl(resultado.pessoaId),
        nome: new FormControl(resultado.nome),
        sobrenome: new FormControl(resultado.sobrenome),
        idade: new FormControl(resultado.idade),
        profissao: new FormControl(resultado.profissao)
      });
    });
  }

  EnviarFormulario(): void {
    const pessoa: Pessoa = this.formulario.value;

    if(pessoa.pessoaId > 0){
      this.pessoasService.AtualizarPessoa(pessoa).subscribe(resultado => {
        this.visibilidadeTabela = false;
        this.visibilidadeFormulario = true;
        alert('Pessoa atualizada com suceso!');
        this.pessoasService.ObterTodos().subscribe((registros) => {
          this.pessoas = registros;
        });
      });
    } else {

      this.pessoasService.SalvarPessoa(pessoa).subscribe((resultado) => {
        this.visibilidadeTabela = false;
        this.visibilidadeFormulario = true;
        alert('Pessoa inserida com suceso!');
        this.pessoasService.ObterTodos().subscribe((registros) => {
          this.pessoas = registros;
        });
      });
    }
  }

  Voltar(): void {
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

  protected readonly Pessoa = Pessoa;
}
