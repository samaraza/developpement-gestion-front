import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Commande } from '../models/commande';



@Injectable({
  providedIn: 'root'
})
export class CommandeService implements OnInit {

  private baseUrl ="http://localhost:8080/api/commandes";


  constructor(private httpClient: HttpClient) { }

    ngOnInit(): void {
        
    }

  public getAllCommandes(headers:any) : Observable<any>{
    return this.httpClient.get(`${this.baseUrl}`,{headers});
  }

  addCommande(commande: any, headers: any): Observable<Commande> {
    return this.httpClient.post<Commande>(this.baseUrl, commande, { headers });
  }

  public deleteCommande(id:number, headers: any) : Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`, { headers });
  }

  public updateCommande(commande: any, id: any, headers: any): Observable<Commande> {
    return this.httpClient.put<Commande>(`${this.baseUrl}/${id}`, commande, { headers });
  }

  public generatePDF(id: any, headers: any): Observable<Blob> {
    return this.httpClient.get(`${this.baseUrl}/${id}/pdf`, {responseType :'blob',headers}, );
  }
  

}