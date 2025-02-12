import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserRestService } from '../../shared/services/user-rest.service';
import { User } from '../../shared/user/user';

@Component({
  selector: 'app-login-screen',
  standalone: false,
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.css'
})
export class LoginScreenComponent {

  @Output() register = new EventEmitter<void>();

  user: User;
  nome: string = '';
  senha: string = '';

  constructor(private userRestService: UserRestService, private router: Router) {
    this.user = new User();
  }

  login() {
    this.userRestService.login(this.user).subscribe(user => {
      if (user?.nome) {
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/home']);
      } else {
        alert('Nome ou senha incorretos');
      }
    }, error => {
      console.error('Error during login:', error);
      alert('Ocorreu um erro durante o login. Por favor, tente novamente.');
    });
  }

  onRegister() {
    this.register.emit();
  }
}
