import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Compte } from 'src/app/models/compte';
import { CompteService } from 'src/app/service/compte.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-dashboard2',
  templateUrl: './dashboard2.component.html',
  styleUrls: ['./dashboard2.component.css']
})
export class Dashboard2Component implements OnInit {

  listeEmploye : Compte [] = []
  role : string = this.token.getUser().roles[0];
  constructor(private serviceCompte:CompteService,
    private token:TokenStorageService,
    private routing : AppRoutingModule,
    ) { }

  ngOnInit(): void {
    if(this.role != "ROLE_ADMIN"){
      this.routing.Redirect()
    }
    this.getallemploye()
  }

  getallemploye(){
    this.serviceCompte.getAllcompte().subscribe((res)=>{
      this.listeEmploye = res;
    })
  }
  downloadPDF(){
    let doc = new jsPDF();
    autoTable(doc,{html:"#Classmenetemploye"});
    doc.save("Classmenetemploye");
  }
}
