import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Usuario } from '../models/usuario';
import { throwError, Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url: string; 

  constructor(private httpClient: HttpClient) { 
    this.url = 'http://localhost:8000/api';
  }
/*
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  logar(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.url + '/login', JSON.stringify(usuario))
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
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
  };*/

}
