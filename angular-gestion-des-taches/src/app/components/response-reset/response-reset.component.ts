import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-response-reset',
  templateUrl: './response-reset.component.html',
  styleUrls: ['./response-reset.component.css']
})
export class ResponseResetComponent implements OnInit {

  form: any = {
    password: null,
  };

  loginForm!: FormGroup;
  submitted: boolean = false;
  isfailed: boolean = false;
  isSuccess: boolean = false;
  errorMessage = '';

  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private routing : AppRoutingModule,
    private token: TokenStorageService
    ){
  }

  ngOnInit(): void {
    if(this.token.getUser().roles[0]=='ROLE_ADMIN' || this.token.getUser().roles[0]=='ROLE_USER'){
      this.routing.Redirect()
    }
  }


  onSubmit() {

    this.submitted = true;
    
    const { password} = this.form;

    
    this.authService.resetpassword(this.route.snapshot.params.id,this.route.snapshot.params.token,{'password':password}).subscribe(
      data => {
        this.isSuccess = true
        this.isfailed = false
        console.log(data)
        setTimeout(() => {
          this.router.navigate(['/login'])
        }, 1500);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isfailed = true
      }
    );  


    
  }

}
