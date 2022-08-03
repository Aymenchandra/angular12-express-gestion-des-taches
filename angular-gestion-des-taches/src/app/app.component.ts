import { Component } from '@angular/core';
import { TokenStorageService } from './service/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showUserBoard = false;
  showModeratorBoard = false;
  email?: string;
  opened:boolean=true
  role !: string ;
  username !: string ;

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router
        ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.username = this.tokenStorageService.getUser().nom +" "+this.tokenStorageService.getUser().prenom;
      this.role = this.tokenStorageService.getUser().roles[0];
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.role = "";
    this.username = "";
    setTimeout(() => {
      
    }, 100);
    window.location.reload();

  }

  
}
