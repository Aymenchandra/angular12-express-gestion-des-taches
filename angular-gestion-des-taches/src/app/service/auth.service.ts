import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      email,
      password
    }, httpOptions);
  }

  register(email:string, nom:string, prenom:string, password:string, atelier:string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      email,
      nom,
      prenom,
      password,
      atelier,
    }, httpOptions);
  }
  forgetpassword(email:any):Observable<any>{
    return this.http.post(AUTH_API + 'forgetpassword',email)
  }
  resetpassword(id:any,token:any,password:any):Observable<any>{
    return this.http.post(AUTH_API + `resetpassword/${id}/${token}`,password)
  }
}