import { Component, EventEmitter, Output } from '@angular/core';
import { Material } from '../../shared/model/material';
import { MaterialRestService } from '../../shared/services/material-rest.service';
import { ActivatedRoute, Router } from '@angular/router';
interface Acesso {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-form-material',
  standalone: false,
  templateUrl: './form-material.component.html',
  styleUrls: ['./form-material.component.css']
})


export class FormMaterialComponent {

  opcoes: Acesso[] = [
    {value: '0', viewValue: 'Privado'},
    {value: '1', viewValue: 'Público'},
  ];

  newMaterial: Material = new Material();
  acaoBotao: string;
  estaCriando: boolean;

  @Output() materialAdded = new EventEmitter<Material>();
 
  constructor(private materialService: MaterialRestService, private router: Router, private activateRoute: ActivatedRoute) {
    this.acaoBotao = 'Adicionar';
    this.estaCriando = true;
    const idEdicao = this.activateRoute.snapshot.params['id'];
    if (idEdicao) {
      this.acaoBotao = 'Atualizar';
      this.estaCriando = false;
      this.materialService.exibirMaterialPorId(idEdicao).subscribe(
        materialPesquisado => this.newMaterial = materialPesquisado
      );
    }
  }

  addMaterialUpdMaterial() {
    if (this.estaCriando) {
      this.materialService.postarMaterial(this.newMaterial).subscribe(
        (material: Material) => {
          this.materialAdded.emit(material);
          this.newMaterial = new Material();
          this.router.navigate(['/materiais']); // Reset the form
        },
        (error: any) => {
          console.error('Error adding material:', error);
        }
      );
    } else {
      this.materialService.atualizarMaterial(this.newMaterial).subscribe(
        (materialAtualizado: Material) => {
          this.router.navigate(['/materiais']);
        },
        (error: any) => {
          console.error('Error updating material:', error);
        }
      );
    }
  }
}