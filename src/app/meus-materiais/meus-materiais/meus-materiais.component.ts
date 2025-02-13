import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MaterialRestService } from '../../shared/services/material-rest.service';
import { Router } from '@angular/router';
import { Material } from '../../shared/model/material';

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

  constructor(private materialRestService: MaterialRestService, private router : Router) {}

  ngOnInit() {
    this.materialRestService.getMaterialbyPrivate().subscribe(data => {
      this.materiais = data;
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
    this.materialRestService.deletarMaterial(id).subscribe(
      () => {
        this.materiais = this.materiais.filter(material => material.id !== id);
      },
      (error) => {
        console.error('Error deleting todo:', error);
      }
    );
  }

}
