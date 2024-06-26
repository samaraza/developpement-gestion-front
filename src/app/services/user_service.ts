import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl ="http://localhost:8080/api/users";

  constructor(private httpClient: HttpClient){}
  

  

  public getAllUsers(headers:any) : Observable<any>{
    return this.httpClient.get(`${this.baseUrl}`,{headers});
  }

  addUser(user: any, headers: any): Observable<User> {
    return this.httpClient.post<User>(this.baseUrl, user, { headers });
  }

  public deleteUser(id:number, headers: any) : Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`, { headers });
  }

  public updateUser(user: any, id: any, headers: any): Observable<User> {
    return this.httpClient.put<User>(`${this.baseUrl}/${id}`, user, { headers });
  }

  public updateFromAdmin(user: any, id: any, headers: any): Observable<User> {
    return this.httpClient.put<User>(`${this.baseUrl}/admin/${id}`, user, { headers });
  }

}
