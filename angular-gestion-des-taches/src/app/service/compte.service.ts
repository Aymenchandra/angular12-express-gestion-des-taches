import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compte } from '../models/compte';

const httpOptions =
{
  Headers:new HttpHeaders
  ({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CompteService {

  private apiUrl="http://localhost:8080"
  constructor(private http:HttpClient) { }

  getAllcompte():Observable<Compte[]>{
    return this.http.get<Compte[]>(`${this.apiUrl}/api/users`)
  }
  getbyId(id:string):Observable<Compte>{
    return this.http.get<Compte>(`${this.apiUrl}/api/users/${id}`)
  }
  deleteCompte(id:any):Observable<Compte[]>{
    return this.http.delete<Compte[]>(`${this.apiUrl}/api/users/${id}`)
  }
  updateCompte(id:any,compte:Compte){
    return this.http.put(`${this.apiUrl}/api/users/${id}`,compte)
  }
}
