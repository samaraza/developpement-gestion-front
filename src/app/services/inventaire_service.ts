import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Inventaire } from '../models/inventaire';


@Injectable({
  providedIn: 'root'
})
export class InventaireService {

  private baseUrl ="http://localhost:8080/api/inventaires";

  constructor(private httpClient: HttpClient){}
  

  

  public getAllInventaires(headers:any) : Observable<any>{
    return this.httpClient.get(`${this.baseUrl}`,{headers});
  }

  addInventaire(inventaire: any, headers: any): Observable<Inventaire> {
    return this.httpClient.post<Inventaire>(this.baseUrl, inventaire, { headers });
  }

  public deleteInventaire(id:number, headers: any) : Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`, { headers });
  }

  public updateInventaire(inventaire: any, id: any, headers: any): Observable<Inventaire> {
    return this.httpClient.put<Inventaire>(`${this.baseUrl}/${id}`, inventaire, { headers });
  }

}
