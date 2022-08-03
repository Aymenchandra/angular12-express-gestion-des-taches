import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AjoutCompteComponent } from './components/ajout-compte/ajout-compte.component';
import { CompteComponent } from './components/compte/compte.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { Dashboard2Component } from './components/dashboard2/dashboard2.component';
import { LoginComponent } from './components/login/login.component';
import { ModifCompteComponent } from './components/modif-compte/modif-compte.component';
import { RequestResetComponent } from './components/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/response-reset/response-reset.component';
import { TacheComponent } from './components/tache/tache.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'request-reset', component: RequestResetComponent },
  { path: 'response-reset/:id/:token', component: ResponseResetComponent },
  { path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuard] },
  { path: 'dashboard2', component: Dashboard2Component,canActivate:[AuthGuard] },
  { path: 'compte', component: CompteComponent,canActivate:[AuthGuard] },
  { path: 'ajoutcompte', component: AjoutCompteComponent,canActivate:[AuthGuard] },
  { path: 'modifier/:id', component: ModifCompteComponent,canActivate:[AuthGuard] },
  { path: 'tache', component: TacheComponent,canActivate:[AuthGuard]},
  { path: '', redirectTo:'login', pathMatch: 'full' },
  { path: '**', redirectTo:'login', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{
  constructor(private router: Router){}

  Redirect(){
    this.router.navigate(['/tache']);
  }

 }

