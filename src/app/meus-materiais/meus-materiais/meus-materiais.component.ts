import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { UserRestService } from '../../shared/services/user-rest.service';

@Component({
  selector: 'app-meus-materiais',
  standalone: false,
  templateUrl: './meus-materiais.component.html',
  styleUrl: './meus-materiais.component.css'
})
export class MeusMateriaisComponent implements OnInit {
  materiais: any[] = [];
  filteredMaterials: any[] = [];
  searchTerm: string = '';

  constructor(private userRestService: UserRestService) {}

  ngOnInit() {
    this.userRestService.getMateriaisUser().subscribe(data => {
      this.materiais = data;
      this.filteredMaterials = data;
    });
  }

  filterCards() {
    this.filteredMaterials = this.filteredMaterials.filter(material => material.titulo.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }
}
