import { Component, EventEmitter, Output } from '@angular/core';
import { UserRestService } from '../../shared/services/user-rest.service';
import { Router } from '@angular/router';
import { User } from '../../shared/user/user';

@Component({
  selector: 'app-register-screen',
  standalone: false,
  templateUrl: './register-screen.component.html',
  styleUrl: './register-screen.component.css'
})
export class RegisterScreenComponent {
  
  @Output() login = new EventEmitter<void>();
  
  user: User;
  nome: string = '';
  email: string = '';
  senha: string = '';

  constructor(private userRestService: UserRestService, private router: Router) {
    this.user = new User();
  }

  register() {
    this.user = new User(this.nome, this.email, this.senha);
    this.userRestService.register(this.user).subscribe(user => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/home']);
      } else {
        alert('Erro ao cadastrar');
      }
    });
  }


  // Método para emitir o evento de login
  onLogin() {
    this.login.emit();
  }

}
