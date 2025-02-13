import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeusMateriaisComponent } from './meus-materiais/meus-materiais.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { ComponentesModule } from '../components/componentes.module';


@NgModule({
  declarations: [
    MeusMateriaisComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ComponentesModule
  ],

  exports: [
    MeusMateriaisComponent
  ]
})
export class MeusMateriaisModule { }
