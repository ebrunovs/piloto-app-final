import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MatIcon } from '@angular/material/icon';
import { ComponentesModule } from '../components/componentes.module';
import { MatCardActions } from '@angular/material/card';
import { MatCardContent } from '@angular/material/card';
import { MatCard} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    MatIcon,
    ComponentesModule,
    MatCardActions,
    MatCardContent,
    MatCard,
    MatButtonModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
