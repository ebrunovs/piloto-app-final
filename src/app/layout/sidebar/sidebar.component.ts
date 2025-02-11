import { Component } from '@angular/core';
import { UserRestService } from '../../shared/services/user-rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {


  constructor(private userRestService: UserRestService, private router: Router) {}

  logout() {
    this.userRestService.logout();
    this.router.navigate(['/login']);
  }
}
