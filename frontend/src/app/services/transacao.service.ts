import { Injectable } from '@angular/core';
import { Transacao } from '../models/transacao';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {

  private url: string = 'http://localhost:8000/api';

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders(
      { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('auth')).token
      }
    )
  }

  getUsuario(): Observable<Usuario> {
    return this.httpClient.get<Usuario>(this.url + '/usuario', this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  saldo(): Observable<Transacao> {
    return this.httpClient.get<Transacao>(this.url + '/saldo', this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  depositar(transacao: Transacao): Observable<Transacao> {
    return this.httpClient.put<Transacao>(this.url + '/deposito', JSON.stringify(transacao), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  sacar(transacao: Transacao): Observable<Transacao> {
    return this.httpClient.put<Transacao>(this.url + '/saque', JSON.stringify(transacao), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  transferencia(transacao: Transacao): Observable<Transacao> {
    return this.httpClient.put<Transacao>(this.url + '/transferencia', JSON.stringify(transacao), this.httpOptions)
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
  };

}
