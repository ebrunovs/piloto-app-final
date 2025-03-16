import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../shared/model/user'; // Adjust the import path as necessary
import { Todo } from '../../shared/model/todo';
import { TodoService } from '../../shared/services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRestService } from '../../shared/services/user-rest.service';
import { MensagemIF } from "../../shared/model/mensagemIF";
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

  constructor(private todoService: TodoServiceIF, private router: Router, private activatedRoute: ActivatedRoute, private userService: UserRestService, private mensagemService: MensagemIF) {
    this.user = this.userService.getCurrentUser();
  }

  ngOnInit(): void {
    if (this.user && this.user.id) {
      this.todoService.readTaskByUser(this.user.id).subscribe({
        next: (data: Todo[]) => {
          this.todos = data;
          this.currentRoute = this.router.url;

        },
        error: (error) => {
          this.mensagemService.erro(`Error fetching todos: ${error}`);
        }
      });
    }
  }

  delete(id: string | undefined): void {
    this.todoService.deleteTask(id).subscribe(
      () => {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.mensagemService.sucesso('Task apagada com sucesso!');
      },
      (error) => {
        this.mensagemService.erro(`Error deleting todos: ${error}`);
      }
    );
  }

  update(todo: Todo | undefined): void {
    if (!todo) {
      this.mensagemService.erro('Todo is undefined');
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
          this.mensagemService.sucesso('Task criada com sucesso!');
        },
        (error) => {
          this.mensagemService.erro(`Error adding todos: ${error}`);
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
