import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';
import { AuthResponse } from '../models/authResponse';

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

  login(usuario: Usuario) : Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(this.url + '/login', usuario, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  autenticar(authResponse: AuthResponse) {
    console.log(authResponse);

    if (authResponse.status) {
      localStorage.setItem('auth', JSON.stringify(
        { status: authResponse.status, 
          token: authResponse.api_key,
          cpf: authResponse.cpf
        }));
      this.usuarioAutenticado = true;
      this.mostarMenuEmitter.emit(true);
      this.router.navigate(['/']);
    } else {
      this.usuarioAutenticado = false;
      this.mostarMenuEmitter.emit(false);

    }
  }

  autenticado(auth: AuthResponse) {
    if (auth.status) {
      this.usuarioAutenticado = true;
      this.mostarMenuEmitter.emit(true);
    }
  }

  removeAuth() {
    localStorage.removeItem('auth');
  }

  usuarioEstaAutenticado() {
    return this.usuarioAutenticado;
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
