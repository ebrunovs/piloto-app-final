import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Todo} from "../model/todo";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private API_URL = "http://localhost:3000/materiais";

  constructor(private http: HttpClient) { }

  createTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.API_URL, todo);
  }

  readTodo(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.API_URL);
  }

  deleteTodo(id: number): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }
}
