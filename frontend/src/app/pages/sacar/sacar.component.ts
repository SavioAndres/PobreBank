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

  constructor(private transacaoService: TransacaoService) { }

  ngOnInit(): void {
  }

  sacar(form: NgForm) {
    this.transacaoService.sacar(this.transacao).subscribe(() => {
      this.cleanForm(form);
    });
  }

  cleanForm(form: NgForm) {
    form.resetForm();
    this.transacao = {} as Transacao;
  }

}
