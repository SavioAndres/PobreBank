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

  constructor(private transacaoService: TransacaoService) { }

  ngOnInit(): void {
  }

  transferir(form: NgForm) {
    this.transacaoService.transferencia(this.transacao).subscribe(() => {
      this.cleanForm(form);
    });
  }

  cleanForm(form: NgForm) {
    form.resetForm();
    this.transacao = {} as Transacao;
  }

}
