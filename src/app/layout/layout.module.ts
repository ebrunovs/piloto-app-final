import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { RegisterScreenComponent } from './register-screen/register-screen.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SidebarComponent,
    LoginScreenComponent,
    RegisterScreenComponent
  ],
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    MatIconModule,
    FormsModule
  ],
  exports: [
    SidebarComponent,
    LoginScreenComponent,
    RegisterScreenComponent
  ]
})
export class LayoutModule { }
