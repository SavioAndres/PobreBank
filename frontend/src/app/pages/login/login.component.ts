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

  constructor(private authServices: AuthService) { }

  ngOnInit(): void {
  }

  fazerLogin() {
    this.authServices.fazerLogin(this.usuario);
  }

  /*saveCar(form: NgForm) {
    if (this.bpressure.bPressureId !== undefined ) {
      this.bpressureService.updateCar(this.bpressure).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.bpressureService.saveCar(this.bpressure).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }*/

}
