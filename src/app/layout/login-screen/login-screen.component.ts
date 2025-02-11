import { Component } from '@angular/core';
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

  user: User;
  nome: string = '';
  senha: string = '';

  constructor(private userRestService: UserRestService, private router: Router) {
    this.user = new User();
  }

  login() {
    this.user = new User(this.nome, '', this.senha);
    this.userRestService.login(this.nome, this.senha).subscribe(user => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/home']);
      } else {
        alert('Nome ou senha incorretos');
      }
    });
  }
}
