import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MateriaisComponent } from './materiais/materiais/materiais.component';
import { HomeComponent } from './home/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'materiais', component: MateriaisComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' } // Rota padrão
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
