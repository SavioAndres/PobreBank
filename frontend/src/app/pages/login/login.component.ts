import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = {} as Usuario;
  checagem: string;

  constructor(private authServices: AuthService) {
    this.checagem = '-----------------';
  }

  ngOnInit(): void {
  }

  fazerLogin() {
    this.authServices.login(this.usuario).subscribe(results => {
      if (results.status) {
        this.checagem = 'Logando...';
        this.authServices.autenticar(results);
      } else {
        this.checagem = 'Login incorreto';
      }
    });
  }

}
