import { Component, Input, OnInit } from '@angular/core';
import { Material } from '../../shared/model/material';
import { MaterialRestService } from '../../shared/services/material-rest.service';
import { User } from '../../shared/model/user';
import { UserRestService } from '../../shared/services/user-rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MensagemIF } from "../../shared/model/mensagemIF";

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  
  materiais: Material[] = [];       // Todos os cards da API
  currentRoute: string = '';
  public user: User | null = null;

  constructor(private materialService: MaterialRestService, private router: Router, private userService: UserRestService, private mensagemService: MensagemIF) {
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
          this.currentRoute = this.router.url;
        },
        error: (error) => {
          this.mensagemService.erro(`Error fetching todos: ${error}`);
        }
      });
    }
  }


  trackById(index: number, card: Material): number {
    return card.id?.length ? Number(card.id) : index;
  }

    update(material: Material | undefined): void {
      if (!material) {
        this.mensagemService.erro('Material não encontrado!');
        return;
      }
      this.router.navigate(['/form-material', material.id]);
    }

  delete(id: string | undefined): void {
    this.materialService.deletarMaterial(id).subscribe(
      () => {
        this.materiais = this.materiais.filter(material => material.id !== id);
        this.mensagemService.sucesso('Material apagado com sucesso!');
      },
      (error) => {
        this.mensagemService.erro(`Error updating materials: ${error}`);
      }
    );
  }
}