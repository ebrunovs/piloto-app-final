import { Component, OnInit } from '@angular/core';
import { Material } from '../../shared/model/material';
import { MaterialRestService } from '../../shared/services/material-rest.service';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  cards: Material[] = [];       // Todos os cards da API
 

  constructor(private materialRestService: MaterialRestService) {}

  ngOnInit() {
    this.materialRestService.exibirMateriais().subscribe(cards => {
      this.cards = cards;
    });
  }

}
