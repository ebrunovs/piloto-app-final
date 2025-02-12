import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import {MatCardModule} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CardTodoComponent } from './card-todo/card-todo.component';


@NgModule({
  declarations: [
    CardComponent,
    CardTodoComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIcon,
    MatButtonModule
  ],
  exports: [
    CardComponent,
    CardTodoComponent
  ]
})
export class ComponentesModule { }