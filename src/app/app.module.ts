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
import {HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors, withInterceptorsFromDi} from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { MeusMateriaisModule } from './meus-materiais/meus-materiais.module';
import { ComponentesModule } from './components/componentes.module';
import { FirestoreModule } from './firestore/firestore.module';
import { TodoServiceIF } from './shared/services/todo-service-if.service';
import { TodoFirestoreService } from './shared/services/todo-firestore.service';
import { MensagemIF } from './shared/model/mensagemIF';
import { MensagemSweetService } from './shared/services/mensagem-sweet.service';
import { ErroInterceptor } from './interceptor/erro-interceptor';

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
    MeusMateriaisModule,
    FirestoreModule
  ],
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErroInterceptor,
      multi: true
  },
  // Escolha qual serviço de mensagens usar
  {
      provide: MensagemIF,
      useClass: MensagemSweetService
  },
  // Escolha qual tipo de serviço (firebase ou rest) usar
    {
        provide: TodoServiceIF,
        useClass: TodoFirestoreService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
