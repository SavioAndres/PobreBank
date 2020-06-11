import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  
  usuario = {} as Usuario;
  checagem: string;

  constructor(private authServices: AuthService, private usuarioService: UsuarioService) {
    this.checagem = '-----------------';
  }

  ngOnInit(): void {}

  criarConta() {
    this.usuarioService.criarUsuario(this.usuario).subscribe((res) => {
      if (res.status) {
        this.checagem = 'Abrindo conta...';
        this.fazerLogin();
      } else {
        this.checagem = 'Este CPF já está cadastrado.';
      }
    });
  }

  fazerLogin() {
    this.authServices.login(this.usuario).subscribe((results) => {
      this.authServices.autenticar(results);
    });
  }
}
