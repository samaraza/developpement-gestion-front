import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Produit } from '../models/produit';


@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private baseUrl ="http://localhost:8080/api/produits";

  constructor(private httpClient: HttpClient){}
  

  

  public getAllProduits(headers:any) : Observable<any>{
    return this.httpClient.get(`${this.baseUrl}`,{headers});
  }

  addProduit(produit: any, headers: any): Observable<Produit> {
    return this.httpClient.post<Produit>(this.baseUrl, produit, { headers });
  }

  public deleteProduit(id:number, headers: any) : Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`, { headers });
  }

  public updateProduit(produit: any, id: any, headers: any): Observable<Produit> {
    return this.httpClient.put<Produit>(`${this.baseUrl}/${id}`, produit, { headers });
  }

}
