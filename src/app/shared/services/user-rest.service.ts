import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRestService {

  private API_URL = 'http://localhost:3000/users';
  private currentUser: User | null = null;

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
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

  getMateriaisUser(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL) // Pega apenas materiais_user do primeiro usuário
      .pipe(
        map(users => users.map(user => {
          user.materiais = user.materiais || [];
          return user;
        }),
        catchError(this.handleError)
      ));
      
  }

  login(user: User): Observable<User | null> {
    return this.http.get<User[]>(`${this.API_URL}?nome=${user.nome}&senha=${user.senha}`).pipe(
      map(users => {
        const loggedInUser = users.find(userLogin => userLogin.nome === user.nome && userLogin.senha === user.senha) || null;
        if (loggedInUser) {
          this.setCurrentUser(loggedInUser);
        }
        return loggedInUser;
      }),
      catchError(this.handleError)
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
