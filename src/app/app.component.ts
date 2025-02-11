import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  isAuthenticated(): boolean {
    return !!localStorage.getItem('user'); // Retorna true se estiver logado
  }
}
