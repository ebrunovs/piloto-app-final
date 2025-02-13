import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriaisComponent } from './materiais/materiais.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { ComponentesModule } from '../components/componentes.module';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';


@NgModule({
  declarations: [
    MateriaisComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatFormField,
    MatLabel,
    ComponentesModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    RouterLink

  ],
  exports: [
    MateriaisComponent
  ]
})
export class MateriaisModule { }
