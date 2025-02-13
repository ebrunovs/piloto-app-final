import { Component, EventEmitter, Output } from '@angular/core';
import { Todo } from '../../shared/model/todo';
import { TodoService } from '../../shared/services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form-todo',
  standalone: false,
  templateUrl: './form-todo.component.html',
  styleUrls: ['./form-todo.component.css'],
})
export class FormTodoComponent {
  newTodo: Todo = new Todo();
  acaoBotao: string;
  estaCriando: boolean;

  @Output() todoAdded = new EventEmitter<Todo>();

  constructor(private todoService: TodoService, private router: Router, private activateRoute: ActivatedRoute) {
    this.acaoBotao = 'Adicionar';
    this.estaCriando = true;
    const idEdicao = this.activateRoute.snapshot.params['id'];
    if (idEdicao) {
      this.acaoBotao = 'Atualizar';
      this.estaCriando = false;
      this.todoService.readTaskById(idEdicao).subscribe(
        todoPesquisado => this.newTodo = todoPesquisado
      );
    }
  }

  addTodoUpdTodo() {
    if (this.estaCriando) {
      this.todoService.createTask(this.newTodo).subscribe(
        (todo: Todo) => {
          this.todoAdded.emit(todo);
          this.newTodo = new Todo();
          this.router.navigate(['/todolist']); // Reset the form
        },
        (error: any) => {
          console.error('Error adding todo:', error);
        }
      );
    } else {
      this.todoService.updateTask(this.newTodo).subscribe(
        (todoAtualizado: Todo) => {
          this.router.navigate(['/todolist']);
        },
        (error: any) => {
          console.error('Error updating todo:', error);
        }
      );
    }
  }
}