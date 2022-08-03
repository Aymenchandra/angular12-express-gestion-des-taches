import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tache } from '../models/tache';

@Injectable({
  providedIn: 'root'
})
export class TacheService {

  private apiUrl="http://localhost:8080/api/tache"
  constructor(private http:HttpClient) { }

  getAlltache():Observable<tache[]>{
    return this.http.get<tache[]>(`${this.apiUrl}/all`)
  }
  getTachebyAtlier(atelier:string):Observable<tache[]>{
    return this.http.get<tache[]>(`${this.apiUrl}/employe/${atelier}`)
  }

  deleteTache(id:String):Observable<tache[]>{
    return this.http.delete<tache[]>(`${this.apiUrl}/all/${id}`)
  }

  exportToDB(filename:any):Observable<tache>{
    return this.http.get<tache>(`${this.apiUrl}/export/${filename}`)
  }

  confirmTache(tache:tache){
    return this.http.put(`${this.apiUrl}/all/${tache._id}`,tache)
  }

  // fetching data
  getByYear(year:any)
  { 
    return this.http.get(`${this.apiUrl}/date/${year}`)
  }
  getByMonth(y:any,m:any,d:any)
  { 
    return this.http.get(`${this.apiUrl}/date/getmonth/${y}/${m}/${d}`)
  }
  getByDay(y:any,m:any,d:any)
  { 
    return this.http.get(`${this.apiUrl}/date/${y}/${m}/${d}`)
  }
}
