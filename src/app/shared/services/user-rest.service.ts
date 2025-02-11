import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../user/user';
import { map, Observable } from 'rxjs';

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
      map(users => users.length > 0 ? users[0] : null)
    );
  }
  logout(): void {
    localStorage.removeItem('user');
  }
}
