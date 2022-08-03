import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http'
import {TableModule} from 'primeng/table';
import {ChartModule} from 'primeng/chart';
import {CardModule} from 'primeng/card';
import {DividerModule} from 'primeng/divider';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {SelectButtonModule} from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import {DropdownModule} from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {InputTextModule} from 'primeng/inputtext';
import { LoginComponent } from './components/login/login.component';
import { CompteComponent } from './components/compte/compte.component';
import { CompteItemsComponent } from './components/compte-items/compte-items.component';
import { AjoutCompteComponent } from './components/ajout-compte/ajout-compte.component';
import { ModifCompteComponent } from './components/modif-compte/modif-compte.component';
import { TacheComponent } from './components/tache/tache.component';
import { Dashboard2Component } from './components/dashboard2/dashboard2.component';
import { AuthInterceptor, authInterceptorProviders } from './helper/auth.interceptor';
import { RequestResetComponent } from './components/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/response-reset/response-reset.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    CompteComponent,
    CompteItemsComponent,
    AjoutCompteComponent,
    ModifCompteComponent,
    TacheComponent,
    Dashboard2Component,
    RequestResetComponent,
    ResponseResetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    HttpClientModule,
    TableModule,
    ChartModule,
    CardModule,
    DividerModule,
    SelectButtonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatSidenavModule,
    MatIconModule,
    InputTextModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
