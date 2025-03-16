import { Component,ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Material } from '../../shared/model/material';
import { MaterialRestService } from '../../shared/services/material-rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
interface Acesso {
  value: string;
  viewValue: string;
}

interface User {
  id: string;
  // Add other properties as needed
}

@Component({
  selector: 'app-form-material',
  standalone: false,
  templateUrl: './form-material.component.html',
  styleUrls: ['./form-material.component.css'],
  providers: [provideNativeDateAdapter(), DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class FormMaterialComponent {

  opcoes: Acesso[] = [
    {value: "Privado", viewValue: 'Privado'},
    {value: "Público", viewValue: 'Público'},
  ];

  newMaterial: Material = new Material();
  acaoBotao: string;
  estaCriando: boolean;
  user: User | null = null;
  userId: string | undefined;

  @Output() materialAdded = new EventEmitter<Material>();
 
  constructor(private materialService: MaterialRestService, private router: Router, private activateRoute: ActivatedRoute, private datePipe: DatePipe) {
    this.acaoBotao = 'Adicionar';
    this.estaCriando = true;

    const userData = localStorage.getItem('user');
    if (userData) {
        this.user = JSON.parse(userData) as User;
        this.userId = this.user.id || undefined;
    }

    const idEdicao = this.activateRoute.snapshot.params['id'];
    if (idEdicao) {
      this.acaoBotao = 'Atualizar';
      this.estaCriando = false;
      this.materialService.exibirMaterialPorId(idEdicao).subscribe(
        materialPesquisado => this.newMaterial = materialPesquisado
      );
    }
  }

  addMaterialUpdMaterial(form: NgForm) {
    if (form.valid) {
      this.newMaterial.data_da_postagem = this.datePipe.transform(this.newMaterial.data_da_postagem, 'MM/dd/yyyy')!;
      this.newMaterial.userId = this.userId;
      this.newMaterial.privado = this.newMaterial.privado === "Privado" ? "true" : "false";
      console.log(this.newMaterial.privado);
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
}