import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { catchError, map, Observable, throwError, of } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserRestService {

  private API_URL = 'http://localhost:8080/users';
  private currentUser: User | null = null;

  constructor(private http: HttpClient) {
    // Carregar usuário do localStorage ao inicializar o serviço
    this.getCurrentUser();
  }

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
    return this.http.post<User>(this.API_URL, user).pipe(
      map(response => {
        // Guarda o usuário após registro
        this.setCurrentUser(response);
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        Swal.fire({
          icon: 'error',
          title: 'Erro de Registro',
          text: 'Ocorreu um erro durante o registro. Por favor, tente novamente.'
        });
        return this.handleError(error);
      })
    );
  }

  getCurrentUser(): User | null {
    if (!this.currentUser) {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          this.currentUser = JSON.parse(storedUser);
        } catch (e) {
          console.error('Erro ao parsear usuário do localStorage:', e);
          localStorage.removeItem('user');
        }
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
    console.error('Ocorreu um erro:', error);
    return throwError(() => new Error('Algo deu errado; por favor tente novamente mais tarde.'));
  }
}