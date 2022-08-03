import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import Swal from 'sweetalert2';
import { AuthService } from '../../service/auth.service';
import { TokenStorageService } from '../../service/token-storage.service';
const USER_KEY = 'reset-user';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.css']
})
export class RequestResetComponent implements OnInit {

  form: any = {
    email: null,
  };

  loginForm!: FormGroup;
  submitted: boolean = false;
  isfailed: boolean = false;
  isSucces: boolean = false;
  errorMessage = '';
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
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
    
    const { email} = this.form;

    
    this.authService.forgetpassword({'email':email}).subscribe((data => {
        this.isSucces = true
        this.isfailed = false
        this.saveToken(data._id);
      }),
      err => {
        this.errorMessage = err.error.message;
        this.isfailed = true
        console.log(this.errorMessage)
      }
    );  
    
  }
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, token);
  }

}