import { Component, OnInit } from '@angular/core';
import { Transacao } from 'src/app/models/transacao';
import { NgForm } from '@angular/forms';
import { TransacaoService } from 'src/app/services/transacao.service';

@Component({
  selector: 'app-depositar',
  templateUrl: './depositar.component.html',
  styleUrls: ['./depositar.component.css']
})
export class DepositarComponent implements OnInit {

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

  depositar(form: NgForm) {
    this.transacaoService.depositar(this.transacao).subscribe(() => {
      this.resposta = 'Depósito de R$' + this.transacao.valor + ' realizado com sucesso.';
      this.getSaldo();
      this.cleanForm(form);
    });
  }

  cleanForm(form: NgForm) {
    form.resetForm();
    this.transacao = {} as Transacao;
  }

}
