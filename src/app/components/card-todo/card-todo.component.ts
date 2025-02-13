import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../shared/model/todo';
import { TodoService } from '../../shared/services/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-todo',
  standalone: false,
  templateUrl: './card-todo.component.html',
  styleUrl: './card-todo.component.css'
})
export class CardTodoComponent {
  todos: Todo[] = [];
  newTodo: Todo = new Todo();

  @Output() todoAdded = new EventEmitter<Todo>();

  constructor(private todoService: TodoService, private router: Router) {}

  ngOnInit(): void {
    this.todoService.readTask().subscribe(
      (data: Todo[]) => {
        this.todos = data;
      },
      (error) => {
        console.error('Error fetching todos:', error);
      }
    );
  }

  delete(id: string | undefined): void {
    this.todoService.deleteTask(id).subscribe(
      () => {
        this.todos = this.todos.filter(todo => todo.id !== id);
      },
      (error) => {
        console.error('Error deleting todo:', error);
      }
    );
  }

  update(todo: Todo | undefined): void {
    if (!todo) {
      console.error('Todo is undefined');
      return;
    }
    this.router.navigate(['/formtodo', todo.id]);
  }

  addTodo() {
    this.todoService.createTask(this.newTodo).subscribe(
      (todo: Todo) => {
        this.todoAdded.emit(todo);
        this.newTodo = new Todo(); // Reset the form
      },
      (error) => {
        console.error('Error adding todo:', error);
      }
    );
  }

  addTodoToList(todo: Todo): void {
    this.todos.push(todo);
  }

  trackByTitulo(index: number, todo: Todo): string {
    return todo.titulo || '';
  }
}
