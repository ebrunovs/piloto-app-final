import { Injectable } from '@angular/core';
import { Todo } from '../model/todo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class TodoServiceIF {

  abstract createTask(todo: Todo): Observable<Todo>;
  abstract readTask(): Observable<Todo[]>;
  abstract updateTask(todo: Todo): Observable<any>;
  abstract deleteTask(id: string | undefined): Observable<any>;
  abstract readTaskByUser(userId: string): Observable<Todo[]>;
  abstract readTaskById(id: string | undefined): Observable<Todo>;
}
