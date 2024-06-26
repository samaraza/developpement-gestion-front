import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SalleTp } from '../models/salletp';



@Injectable({
  providedIn: 'root'
})
export class SalleTpService implements OnInit {

  private baseUrl ="http://localhost:8080/api/salleTps";


  constructor(private router:Router,private httpClient: HttpClient) { }

    ngOnInit(): void {
        
    }

  public geAllSalleTp(headers:any) : Observable<any>{
    return this.httpClient.get(`${this.baseUrl}`,{headers});
  }

  addSalleTp(salletp: any, headers: any): Observable<SalleTp> {
    return this.httpClient.post<SalleTp>(this.baseUrl, salletp, { headers });
  }

  public deleteSalleTp(id:number, headers: any) : Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`, { headers });
  }

  public updateSalleTp(salletp: any, id: any, headers: any): Observable<SalleTp> {
    return this.httpClient.put<SalleTp>(`${this.baseUrl}/${id}`, salletp, { headers });
  }

}