import { Component, Input, OnInit } from '@angular/core';
import { Material } from '../../shared/model/material';
import { MaterialRestService } from '../../shared/services/material-rest.service';
import { User } from '../../shared/model/user';
import { UserRestService } from '../../shared/services/user-rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  @Input() material: any;
  
  materiais: Material[] = [];       // Todos os cards da API
  filteredCards: Material[] = []; 
  currentRoute: string = '';
  public user: User | null = null;

  constructor(private materialService: MaterialRestService, private router: Router, private userService: UserRestService) {
    this.user = this.userService.getCurrentUser();
  }

  ngOnInit(): void {
    if (this.user && this.user.id) {
      this.materialService.getMateriais().subscribe({
        next: (materiais: Material[]) => {
          this.materiais = materiais.map(material => ({
            ...material,
            isOwner: material.userId === this.user!.id
          }));
          this.filteredCards = this.materiais;
          this.currentRoute = this.router.url;
        },
        error: (error) => {
          console.error('Error fetching materials:', error);
        }
      });
    }
  }

  filterCards(searchTerm: string) {
    this.filteredCards = this.materiais.filter(card => 
      card.titulo && card.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  toggleFavorito(card: Material) {
    card.favorito = !card.favorito;
    this.materialService.atualizarMaterial(card).subscribe(
      (materialAtualizado: Material) => {
        console.log('Material atualizado:', materialAtualizado);
      },
      (error: any) => {
        console.error('Error updating material:', error);
      }
    );
  }

  trackById(index: number, card: Material): number {
    return card.id?.length ? Number(card.id) : index;
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
        this.materiais = this.materiais.filter(material => material.id !== id);
      },
      (error) => {
        console.error('Error deleting todo:', error);
      }
    );
  }
}