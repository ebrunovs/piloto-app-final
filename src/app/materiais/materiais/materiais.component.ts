import { Component, OnInit } from '@angular/core';
import { Material } from '../../shared/model/material';
import { Router } from '@angular/router';
import { MaterialRestService } from '../../shared/services/material-rest.service';
import { UserRestService } from '../../shared/services/user-rest.service';

@Component({
  selector: 'app-materiais',
  standalone: false,
  templateUrl: './materiais.component.html',
  styleUrl: './materiais.component.css'
})
export class MateriaisComponent implements OnInit {
  materials: Material[] = [];
  filteredCards: Material[] = [];
  searchTerm: string = '';
  constructor(private materialService: MaterialRestService, private userService: UserRestService, private router: Router) {}

  ngOnInit() {
    this.materialService.getMateriais().subscribe({
      next: (materiais: Material[]) => {
        this.filteredCards = [...materiais]; // Armazena diretamente no array de filtros
        console.log('Materiais:  ', this.filteredCards);
      },
      error: (error) => {
        console.error('Erro ao buscar materiais:', error);
      }
    });
  }

  filterCards() {
    if (this.searchTerm.trim()) {
      this.filteredCards = this.materials.filter(material =>
        material.titulo?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        material.disciplina?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        material.assunto?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      // Se o termo de busca estiver vazio, mostrar todos os materiais
      this.filteredCards = [...this.materials];
    }
    console.log('Filtrando materiais: ', this.filteredCards);
  }
}