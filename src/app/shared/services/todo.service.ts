import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Todo} from "../model/todo";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private API_URL = "http://localhost:3000/todos";

  constructor(private http: HttpClient) { }

  createTask(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.API_URL, todo);
  }

  readTask(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.API_URL).pipe(
      catchError(this.handleError)
    );
  }

  updateTask(todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(`${this.API_URL}/${todo.id}`, todo);
  }

  deleteTask(id: string | undefined): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  readTaskById(id: string | undefined): Observable<Todo> {
    return this.http.get<Todo>(`${this.API_URL}/${id}`);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}
