import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompteService } from '../../service/compte.service';
import { Compte } from 'src/app/models/compte';
import { FormControl, FormGroup } from '@angular/forms';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { AppRoutingModule } from 'src/app/app-routing.module';

@Component({
  selector: 'app-modif-compte',
  templateUrl: './modif-compte.component.html',
  styleUrls: ['./modif-compte.component.css']
})
export class ModifCompteComponent implements OnInit {

  editCompte = new FormGroup ({
    // email: new FormControl(''),
    nom: new FormControl(''),
    prenom: new FormControl(''),
    atelier: new FormControl('')
  })
  role : string = this.token.getUser().roles[0];
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  compte !: Compte

  constructor(private router : ActivatedRoute,
    private compteService : CompteService,
    private token:TokenStorageService,
    private routing : AppRoutingModule,
    ) { }

  ngOnInit(): void {
    if(this.role != "ROLE_ADMIN"){
      this.routing.Redirect()
    }
    this.compteService.getbyId(this.router.snapshot.params.id).subscribe((res:any)=>{
      this.editCompte = new FormGroup ({
        // email: new FormControl(res["email"]),
        nom: new FormControl(res["nom"]),
        prenom: new FormControl(res["prenom"]),
        atelier: new FormControl(res["atelier"])
      })
    })
    
  }

  UpdateCompte(){
    this.compteService.updateCompte(this.router.snapshot.params.id,this.editCompte.value).subscribe((result)=>{
      this.isSuccessful = true;
      setTimeout(function(){
      window.history.back()
      }, 1000);
    })

  }
  onSubmit(): void {

  }
}
