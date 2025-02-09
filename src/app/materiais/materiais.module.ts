import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MateriaisComponent } from './materiais/materiais.component';



@NgModule({
  declarations: [
    MateriaisComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MateriaisComponent
  ]
})
export class MateriaisModule { }
