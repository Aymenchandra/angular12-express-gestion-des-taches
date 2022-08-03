import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Compte } from 'src/app/models/compte';
import { CompteService } from 'src/app/service/compte.service';
@Component({
  selector: 'app-compte-items',
  templateUrl: './compte-items.component.html',
  styleUrls: ['./compte-items.component.css']
})
export class CompteItemsComponent implements OnInit {

  @Input() compte!:Compte;
  @Output() onDeleteCompte:EventEmitter<Compte> = new EventEmitter();

  constructor(private compteservice : CompteService) { }

  ngOnInit(): void {
  }

  deleteComment(compte:Compte) {
    this.onDeleteCompte.emit(compte)
}
}
