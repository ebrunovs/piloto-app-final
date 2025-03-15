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
        this.materials = materiais.map(material => ({
          ...material,
          isOwner: material.userId === this.userService.getCurrentUser()?.id
        }));
        this.filteredCards = [...this.materials]; // Inicialmente, exibe todos
        console.log('Materiais:  ', this.filteredCards);
      },
      error: (error) => {
        console.error('Erro ao buscar materiais:', error);
      }
    });
  }

  update(material: Material | undefined): void {
    if (!material) {
      console.error('material is undefined');
      return;
    }
    this.router.navigate(['/form-material', material.id]);
  }

delete(id: string | undefined): void {
  this.materialService.deletarMaterial(id).subscribe(
    () => {
      this.materials = this.materials.filter(material => material.id !== id);
    },
    (error) => {
      console.error('Error deleting todo:', error);
    }
  );
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