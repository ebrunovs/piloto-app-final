import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriaisComponent } from './materiais/materiais.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { ComponentesModule } from '../componentes/componentes.module';


@NgModule({
  declarations: [
    MateriaisComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatFormField,
    MatLabel,
    ComponentesModule
  ],
  exports: [
    MateriaisComponent
  ]
})
export class MateriaisModule { }
