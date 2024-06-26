import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Fournisseur } from '../models/founisseur';









@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  private baseUrl ="http://localhost:8080/api/fournisseurs";

  constructor(private httpClient: HttpClient){}
  

  

  public getAllFournisseurs(headers:any) : Observable<any>{
    return this.httpClient.get(`${this.baseUrl}`,{headers});
  }

  addFournisseur(fournisseur: any, headers: any): Observable<Fournisseur> {
    return this.httpClient.post<Fournisseur>(this.baseUrl, fournisseur, { headers });
  }

  public deleteFournisseur(id:number, headers: any) : Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`, { headers });
  }

  public updateFournisseur(fournisseur: any, id: any, headers: any): Observable<Fournisseur> {
    return this.httpClient.put<Fournisseur>(`${this.baseUrl}/${id}`, fournisseur, { headers });
  }

}
