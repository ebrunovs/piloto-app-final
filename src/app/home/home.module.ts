import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MatIcon } from '@angular/material/icon';
import { ComponentesModule } from '../componentes/componentes.module';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    MatIcon,
    ComponentesModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
