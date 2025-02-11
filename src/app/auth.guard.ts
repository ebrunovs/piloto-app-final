import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = !!localStorage.getItem('user'); // Simulando login com localStorage
    if (!isAuthenticated) {
      this.router.navigate(['/']); // Redireciona para login se não estiver autenticado
      return false;
    }
    return true;
  }
}
