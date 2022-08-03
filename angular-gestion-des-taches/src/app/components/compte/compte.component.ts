import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Compte } from 'src/app/models/compte';
import { CompteService } from 'src/app/service/compte.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent implements OnInit {

  role : string = this.token.getUser().roles[0];
  comptes !: Compte[]
  constructor(private compteservice : CompteService,
    private token:TokenStorageService,
    private routing : AppRoutingModule,
    ) { }

  ngOnInit(): void {
    if(this.role != "ROLE_ADMIN"){
      this.routing.Redirect()
    }
    this.getcomptes()
  }
  getcomptes()
  {
    this.compteservice.getAllcompte().subscribe((compte)=>(this.comptes = compte));
  }

  DeleteCompte(id:any)
  {
    this.confirmDelete(id)
  }

   
  confirmDelete(id:any){
    Swal.fire({
      title: 'Vous êtes sûr de vouloir supprimer?',
      text: 'Vous ne serez pas en mesure de récupérer ces données!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimez-le !',
      cancelButtonText: 'Non, gardez-le.'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Supprimé!',
          'Ces données ont été supprimées.',
          'success'
        )
        this.compteservice.deleteCompte(id).subscribe(()=>this.getcomptes());
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annulé',
          'Ces données est en sécurité :)',
          'error'
        )
      }
    })
  }
}
