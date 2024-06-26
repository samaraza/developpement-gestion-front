import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { UserService } from './user_service';
import { HttpClient } from '@angular/common/http';
import { Labo } from '../models/labo';



@Injectable({
  providedIn: 'root'
})
export class LaboService implements OnInit {

  private baseUrl ="http://localhost:8080/api/labos";


  constructor(private userService: UserService,private router:Router,private httpClient: HttpClient) { }

    ngOnInit(): void {
        
    }

  public geAllLabos(headers:any) : Observable<any>{
    return this.httpClient.get(`${this.baseUrl}`,{headers});
  }

  addLabo(labo: any, headers: any): Observable<Labo> {
    return this.httpClient.post<Labo>(this.baseUrl, labo, { headers });
  }

  public deleteLabo(id:number, headers: any) : Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`, { headers });
  }

  public updateLabo(labo: any, id: any, headers: any): Observable<Labo> {
    console.log("final", labo);
    return this.httpClient.put<Labo>(`${this.baseUrl}/${id}`, labo, { headers });
  }
  

}