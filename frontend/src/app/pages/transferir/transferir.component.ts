import { Component, OnInit } from '@angular/core';
import { TransacaoService } from 'src/app/services/transacao.service';
import { NgForm } from '@angular/forms';
import { Transacao } from 'src/app/models/transacao';

@Component({
  selector: 'app-transferir',
  templateUrl: './transferir.component.html',
  styleUrls: ['./transferir.component.css']
})
export class TransferirComponent implements OnInit {

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

  transferir(form: NgForm) {
    this.transacaoService.transferencia(this.transacao).subscribe(() => {
      this.resposta = 'Transfência de R$' + this.transacao.valor + ' para CPF: ' + this.transacao.cpf + ' realizado com sucesso.';
      this.getSaldo();
      this.cleanForm(form);
    });
  }

  cleanForm(form: NgForm) {
    form.resetForm();
    this.transacao = {} as Transacao;
  }

}
