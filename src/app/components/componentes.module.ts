import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import {MatCardModule} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CardTodoComponent } from './card-todo/card-todo.component';
import { FormTodoComponent } from './form-todo/form-todo.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormMaterialComponent } from './form-material/form-material.component';
import { MatSelectModule } from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';


@NgModule({
  declarations: [
    CardComponent,
    CardTodoComponent,
    FormTodoComponent,
    FormMaterialComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIcon,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    RouterLink,
    MatDatepickerModule,
  ],
  exports: [
    CardComponent,
    CardTodoComponent,
    FormTodoComponent,
    FormMaterialComponent
  ]
})
export class ComponentesModule { }