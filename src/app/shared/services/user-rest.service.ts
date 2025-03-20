import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserRestService {

  private API_URL = 'http://localhost:8080/users';
  private currentUser: User | null = null;

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User | null> {
    if (!user.nome || !user.senha || !user.email) {
      Swal.fire({
        icon: 'error',
        title: 'Erro de Registro',
        text: 'Todos os campos são obrigatórios'
      });
      return of(null);
    }
    delete user.id;
    return this.http.post<User>(this.API_URL, user);
  }

  getCurrentUser(): User | null {
    if (!this.currentUser) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        this.currentUser = JSON.parse(storedUser);
      }
    }
    return this.currentUser;
  }

  setCurrentUser(user: User): void {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  login(user: User): Observable<User | null> {
    return this.http.post<User>(this.API_URL + "/login", {
      nome: user.nome, 
      senha: user.senha
    }).pipe(
      map(response => {
        if (response) {
          this.setCurrentUser(response);
          return response;
        }
        return null;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          Swal.fire({
            icon: 'error',
            title: 'Erro de Login',
            text: 'Nome ou senha incorretos'
          });
          return of(null); // Retorna null para credenciais inválidas
        }
        return this.handleError(error);
      })
    );
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('user');
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    // Handle the error appropriately here
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}
