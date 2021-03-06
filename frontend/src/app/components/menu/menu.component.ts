import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  mostrarMenu: boolean = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.mostrarMenu = this.authService.usuarioEstaAutenticado();
  }

  sair() {
    localStorage.removeItem('auth');
    window.location.replace('/login');
  }

}
