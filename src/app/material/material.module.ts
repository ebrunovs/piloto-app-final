import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule
  ]
})
export class MaterialModule { }
