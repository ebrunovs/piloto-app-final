import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriaisComponent } from './materiais/materiais.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { CardComponent } from '../componentes/card/card.component';


@NgModule({
  declarations: [
    MateriaisComponent,
    CardComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatFormField,
    MatLabel
    
  ],
  exports: [
    MateriaisComponent
  ]
})
export class MateriaisModule { }
