
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Preparation } from '../models/preparation';


@Injectable({
  providedIn: 'root'
})
export class PreparationService {

  private baseUrl ="http://localhost:8080/api/preparations";

  constructor(private httpClient: HttpClient){}
  

  

  public getAllPreparations(headers:any) : Observable<any>{
    return this.httpClient.get(`${this.baseUrl}`,{headers});
  }

  addPreparation(preparation: any, headers: any): Observable<Preparation> {
    return this.httpClient.post<Preparation>(this.baseUrl, preparation, { headers });
  }

  public deletePreparation(id:number, headers: any) : Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`, { headers });
  }

  public updatePreparation(preparation: any, id: any, headers: any): Observable<Preparation> {
    return this.httpClient.put<Preparation>(`${this.baseUrl}/${id}`, preparation, { headers });
  }

}
