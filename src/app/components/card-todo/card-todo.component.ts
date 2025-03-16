import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../shared/model/user'; // Adjust the import path as necessary
import { Todo } from '../../shared/model/todo';
import { TodoService } from '../../shared/services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRestService } from '../../shared/services/user-rest.service';
import { TodoServiceIF } from '../../shared/services/todo-service-if.service';

@Component({
  selector: 'app-card-todo',
  standalone: false,
  templateUrl: './card-todo.component.html',
  styleUrl: './card-todo.component.css'
})
export class CardTodoComponent {
  todos: Todo[] = [];
  newTodo: Todo = new Todo();
  currentRoute: string = '';
  public user: User | null = null;

  @Output() todoAdded = new EventEmitter<Todo>();

  constructor(private todoService: TodoServiceIF, private router: Router, private activatedRoute: ActivatedRoute, private userService: UserRestService) {
    this.user = this.userService.getCurrentUser();
  }

  ngOnInit(): void {
    if (this.user && this.user.id) {
      console.log(this.todoService.readTaskByUser(this.user.id));
      this.todoService.readTaskByUser(this.user.id).subscribe({
        next: (data: Todo[]) => {
          this.todos = data;
          this.currentRoute = this.router.url;
        },
        error: (error) => {
          console.error('Error fetching todos:', error);
        }
      });
    }
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
    if (this.user) {
      this.newTodo.userId = this.user.id; // Associe o todo ao usuário atual
      this.todoService.createTask(this.newTodo).subscribe(
        (todo: Todo) => {
          this.todoAdded.emit(todo);
          this.todos.push(todo); // Adicione o novo todo à lista
          this.newTodo = new Todo(); // Reset the form
        },
        (error) => {
          console.error('Error adding todo:', error);
        }
      );
    }
  }

  addTodoToList(todo: Todo): void {
    this.todos.push(todo);
  }

  trackByTitulo(index: number, todo: Todo): string {
    return todo.titulo || '';
  }
}
