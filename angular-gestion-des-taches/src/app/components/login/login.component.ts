import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppRoutingModule } from 'src/app/app-routing.module';
import Swal from 'sweetalert2';
import { AuthService } from '../../service/auth.service';
import { TokenStorageService } from '../../service/token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    email: null,
    password: null
  };

  loginForm!: FormGroup;
  submitted: boolean = false;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private routing : AppRoutingModule,
    ){
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.routing.Redirect()
    }
  }


  onSubmit() {
    this.submitted = true;
    
    const { email, password } = this.form;

    
    this.authService.login(email, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
       
        this.successfullylogin()
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );  
    
    
  }


  successfullylogin(){
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Welcome to your session',
      showConfirmButton: false,
      timer: 1500
    })
    setTimeout(function(){
      location.reload()
      }, 1000);
    

  }
}
