
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Post } from '../models/post';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl ="http://localhost:8080/api/posts";

  constructor(private httpClient: HttpClient){}
  

  

  public getAllPosts(headers:any) : Observable<any>{
    return this.httpClient.get(`${this.baseUrl}`,{headers});
  }

  addPost(post: any, headers: any): Observable<Post> {
    console.log("post"+post)
    return this.httpClient.post<Post>(this.baseUrl, post, { headers });
  }

  public deletePost(id:number, headers: any) : Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`, { headers });
  }

  public updatePost(post: any, id: any, headers: any): Observable<Post> {
    return this.httpClient.put<Post>(`${this.baseUrl}/${id}`, post, { headers });
  }

}
