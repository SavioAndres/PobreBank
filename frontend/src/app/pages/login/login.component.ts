import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario();

  constructor(private authServices: AuthService) { }

  ngOnInit(): void {
  }

  fazerLogin() {
    this.authServices.fazerLogin(this.usuario);
  }

}
