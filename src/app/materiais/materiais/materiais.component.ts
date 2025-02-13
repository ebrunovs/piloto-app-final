import { Component, OnInit } from '@angular/core';
import { Material } from '../../shared/model/material';
import { MaterialRestService } from '../../shared/services/material-rest.service';

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

  constructor(private materialRestService: MaterialRestService) {}

  ngOnInit() {
    this.loadMaterials();
  }

  loadMaterials() {
    this.materialRestService.exibirMateriais().subscribe((materials: Material[]) => {
      this.materials = materials;
      this.filteredCards = materials;
    });
  }

  filterCards() {
    this.filteredCards = this.materials.filter( card => card.titulo && card.titulo.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }
}