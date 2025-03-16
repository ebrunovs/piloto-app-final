import { Component,ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Todo } from '../../shared/model/todo';
import { TodoService } from '../../shared/services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MensagemIF } from "../../shared/model/mensagemIF";
import { TodoServiceIF } from '../../shared/services/todo-service-if.service';

@Component({
  selector: 'app-form-todo',
  standalone: false,
  templateUrl: './form-todo.component.html',
  styleUrls: ['./form-todo.component.css'],
  providers: [provideNativeDateAdapter(), DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormTodoComponent {
  newTodo: Todo = new Todo();
  acaoBotao: string;
  estaCriando: boolean;
  userId: string | undefined = undefined;

  @Output() todoAdded = new EventEmitter<Todo>();

  constructor(private todoService: TodoServiceIF, private router: Router, private activateRoute: ActivatedRoute, private datePipe: DatePipe, private mensagemService: MensagemIF) {
    this.acaoBotao = 'Adicionar';
    this.estaCriando = true;

    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      this.userId = user.id || null;
    }

    const idEdicao = this.activateRoute.snapshot.params['id'];
    if (idEdicao) {
      this.acaoBotao = 'Atualizar';
      this.estaCriando = false;
      this.todoService.readTaskById(idEdicao).subscribe(
        todoPesquisado => this.newTodo = todoPesquisado
      );
    }
  }

  addTodoUpdTodo(form: NgForm) {
    if (form.valid) {
      // Format the date before sending it to the server

      this.newTodo.userId = this.userId;

      this.newTodo.data_da_postagem = this.datePipe.transform(this.newTodo.data_da_postagem, 'MM/dd/yyyy')!;
      if (this.estaCriando) {
        this.todoService.createTask(this.newTodo).subscribe(
          (todo: Todo) => {
            this.todoAdded.emit(todo);
            this.newTodo = new Todo();
            this.mensagemService.sucesso('Task criada com sucesso!');
            this.router.navigate(['/todolist']); // Reset the form
          },
          (error: any) => {
            this.mensagemService.erro(`Error adding todos: ${error}`);
          }
        );
      } else {
        this.todoService.updateTask(this.newTodo).subscribe(
          (todoAtualizado: Todo) => {
            this.mensagemService.sucesso('Task atualizada com sucesso!');
            this.router.navigate(['/todolist']);
          },
          (error: any) => {
            this.mensagemService.erro(`Error updating todos: ${error}`);
          }
        );
      }
    }
  }
}