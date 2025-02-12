import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  showRegisterScreen: boolean = false;

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user'); // Retorna true se estiver logado
  }

  showRegister(): void {
    this.showRegisterScreen = true; // Retorna true se não estiver logado
  }

  showLogin(): void {
    this.showRegisterScreen = false; // Retorna true se estiver logado
  }
}
