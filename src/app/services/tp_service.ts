import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Tp } from '../models/tp';



@Injectable({
  providedIn: 'root'
})
export class TpService implements OnInit {

  private baseUrl ="http://localhost:8080/api/tps";


  constructor(private httpClient: HttpClient) { }

    ngOnInit(): void {
        
    }

  public getAllTps(headers:any) : Observable<any>{
    return this.httpClient.get(`${this.baseUrl}`,{headers});
  }

  addTp(tp: any, headers: any): Observable<Tp> {
    return this.httpClient.post<Tp>(this.baseUrl, tp, { headers });
  }

  public deleteTp(id:number, headers: any) : Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`, { headers });
  }

  public updateTp(tp: any, id: any, headers: any): Observable<Tp> {
    return this.httpClient.put<Tp>(`${this.baseUrl}/${id}`, tp, { headers });
  }
  

}