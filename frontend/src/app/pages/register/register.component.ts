import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario';
import { TransacaoService } from 'src/app/services/transacao.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  usuario = {} as Usuario;

  constructor(private authServices: AuthService, private usuarioService: UsuarioService) {}

  ngOnInit(): void {}

  criarConta() {
    this.usuarioService.criarUsuario(this.usuario).subscribe((res) => {
      this.fazerLogin();
    });
  }

  fazerLogin() {
    this.authServices.login(this.usuario).subscribe((results) => {
      this.authServices.autenticar(results);
    });
  }
}
