import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user/user';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRestService {

  private API_URL = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.API_URL, user);
  }

  login(nome: string, senha: string): Observable<User | null> {
    return this.http.get<User[]>(`${this.API_URL}?nome=${nome}&senha=${senha}`).pipe(
      map(users => users.length > 0 ? users[0] : null),
      catchError(this.handleError)
    );
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    // Handle the error appropriately here
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}
