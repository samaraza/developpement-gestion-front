import { Armoire } from './../models/armoire';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ArmoireService {

  private baseUrl ="http://localhost:8080/api/armoires";

  constructor(private httpClient: HttpClient){}
  

  

  public getAllArmoires(headers:any) : Observable<any>{
    return this.httpClient.get(`${this.baseUrl}`,{headers});
  }

  addArmoire(armoire: any, headers: any): Observable<Armoire> {
    return this.httpClient.post<Armoire>(this.baseUrl, armoire, { headers });
  }

  public deleteArmoire(id:number, headers: any) : Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`, { headers });
  }

  public updateArmoire(armoire: any, id: any, headers: any): Observable<Armoire> {
    return this.httpClient.put<Armoire>(`${this.baseUrl}/${id}`, armoire, { headers });
  }

}
