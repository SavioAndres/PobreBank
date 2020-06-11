import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { TransacaoService } from 'src/app/services/transacao.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usuario = {} as Usuario;

  constructor(private transacaoService: TransacaoService) {
    this.getUsuario();
  }

  ngOnInit(): void {
  }

  getUsuario() {
    this.transacaoService.getUsuario().subscribe((usuario: Usuario) => {
      this.usuario = usuario;
    });
  }

}
