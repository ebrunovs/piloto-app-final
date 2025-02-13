import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { HomeModule } from './home/home.module';
import { MateriaisModule } from './materiais/materiais.module';
import { TodolistModule } from './todolist/todolist.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MeusMateriaisModule } from './meus-materiais/meus-materiais.module';
import { ComponentesModule } from './components/componentes.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    MatIconModule,
    HomeModule,
    MateriaisModule,
    FormsModule,
    TodolistModule,
    ComponentesModule,
    HttpClientModule,
    MeusMateriaisModule
  ],
  providers: [
    provideAnimations()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
