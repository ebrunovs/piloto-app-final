import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';



@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    MatIconModule
  ],
  exports: [
    SidebarComponent,
  ]
})
export class LayoutModule { }
