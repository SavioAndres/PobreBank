import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { AuthResponse } from './models/authResponse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PobreBank';

  currentUser: AuthResponse;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(localStorage.getItem('auth'));

    if (this.currentUser !== null) {
      this.authService.autenticado(this.currentUser);
    }

  }
}
