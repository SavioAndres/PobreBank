import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuarioAutenticado: boolean = false;
  mostarMenuEmitter = new EventEmitter<boolean>();
  private url: string; 
  private returnLogin: any;

  constructor(private router: Router, private httpClient: HttpClient) { 
    this.url = 'http://localhost:8000/api';
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  fazerLogin(usuario: Usuario) {
    console.log(usuario);
    console.log('--------------');
    this.returnLogin = this.httpClient.post<any>(this.url + '/login', usuario).subscribe();

    console.log(this.returnLogin);
    console.log('--------------');
    /*if (this.returnLogin.status === 'success') {
      this.usuarioAutenticado = true;
      
      this.mostarMenuEmitter.emit(true);

      this.router.navigate(['/']);

    } else {

      this.usuarioAutenticado = false;

      this.mostarMenuEmitter.emit(false);

    }*/
  }

  usuarioEstaAutenticado() {
    return this.usuarioAutenticado;
  }

}
