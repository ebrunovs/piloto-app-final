import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MeusMateriaisComponent } from './meus-materiais/meus-materiais.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { ComponentesModule } from '../components/componentes.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MeusMateriaisComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    ComponentesModule,
    MatButtonModule,
    MatCardModule,
    FormsModule
  ],

  exports: [
    MeusMateriaisComponent
  ]
})
export class MeusMateriaisModule { }
