import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { AppRoutingModule } from 'src/app/app-routing.module';

@Component({
  selector: 'app-ajout-compte',
  templateUrl: './ajout-compte.component.html',
  styleUrls: ['./ajout-compte.component.css']
})

export class AjoutCompteComponent implements OnInit {
  role : string = this.token.getUser().roles[0];
  form: any = {
    email: null,
    nom: null,
    prenom: null,
    password: null,
    atelier: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService,
    private token:TokenStorageService,
    private routing : AppRoutingModule,
    ) { }

  ngOnInit(): void {
    if(this.role != "ROLE_ADMIN"){
      this.routing.Redirect()
    }
  }

  onSubmit(): void {
    const { email, nom, prenom, password, atelier } = this.form;

    this.authService.register(email, nom, prenom, password, atelier).subscribe(
      data => {
        setTimeout(function(){
          window.history.back()
          }, 1000);
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );

  }
}
