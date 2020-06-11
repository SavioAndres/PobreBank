import { Component, OnInit } from '@angular/core';
import { Transacao } from 'src/app/models/transacao';
import { TransacaoService } from 'src/app/services/transacao.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sacar',
  templateUrl: './sacar.component.html',
  styleUrls: ['./sacar.component.css']
})
export class SacarComponent implements OnInit {

  transacao = {} as Transacao;
  saldo: number;
  resposta: string;

  constructor(private transacaoService: TransacaoService) {
    this.getSaldo();
    this.resposta = '---------------------';
  }

  ngOnInit(): void {
  }

  getSaldo() {
    this.transacaoService.saldo().subscribe((transacao: Transacao) => {
      this.saldo = transacao.balance;
    });
  }

  sacar(form: NgForm) {
    this.transacaoService.sacar(this.transacao).subscribe(() => {
      this.resposta = 'Saque de R$' + this.transacao.valor + ' realizado com sucesso.';
      this.getSaldo();
      this.cleanForm(form);
    });
  }

  cleanForm(form: NgForm) {
    form.resetForm();
    this.transacao = {} as Transacao;
  }

}
