import { Component } from '@angular/core';
import { Material } from '../../shared/model/material';
import { MaterialRestService } from '../../shared/services/material-rest.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  cards: Material[] = []

  constructor(private materialRestService: MaterialRestService) {}

  ngOnInit() {
    this.loadMaterials();
  }

  loadMaterials() {
    this.materialRestService.exibirMateriais().subscribe((materiais: Material[]) => {
      this.cards = materiais.slice(0, 4);
      console.log(this.cards);
    });
  }

}
