import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarTodoComponent } from './navbar-todo/navbar-todo.component';
import { MatIconModule } from '@angular/material/icon';
import { ComponentesModule } from '../components/componentes.module';


@NgModule({
  declarations: [
    NavbarTodoComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ComponentesModule
  ]
})
export class TodolistModule { }
