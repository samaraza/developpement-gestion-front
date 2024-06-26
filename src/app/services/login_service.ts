import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { UserService } from './user_service';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit {

  private baseUrl ="http://localhost:8080/api/auth/login";
  public users: User[] =[];
  public loggedUser: string ="";
  public isLoggedIn: Boolean = false;
  public roles: string =""; //stocker le role du user connecté
  public connectedUser: User = new User();
  constructor(private userService: UserService,private router:Router,private httpClient: HttpClient) { }


  ngOnInit(): void {

  }

  public signIn(headers:any) : Observable<any>{
    return this.httpClient.get(`${this.baseUrl}`,{headers});
  }

  // public signIn(payload : any) :Observable<any> {
  //     // let validUser: Boolean = false;
  //     // console.log("here3")
  //     // this.users.forEach((curUser) => {
  //     //   if (user.email == curUser.email && user.password == curUser.password) {
  //     //     console.log("curUser " + curUser)
  //     //     validUser = true;
  //     //     this.loggedUser = curUser.email;
  //     //     this.isLoggedIn = true;
  //     //     this.roles = curUser.role;
  //     //     user.role=curUser.role;

  //     //     //local storage ne stoque que des string
  //     //     localStorage.setItem('loggedUser', String(this.loggedUser));//ele a ete     localStorage.setItem('loggedUser', (this.loggedUser);
  //     //     localStorage.setItem('isLoggedIn', String(this.isLoggedIn))//car elle est boolean

  //     //   }
  //     // })
  // }

  LogOut(){
    this.isLoggedIn = false;
    this.loggedUser = "";
    this.roles = "";
    localStorage.removeItem('loggedUser');
    localStorage.setItem('isLoggedIn',String(this.isLoggedIn))
    this.router.navigate(['login']);
  }


  setLoggedUserFromLocalStorage(login : string){   //pour ne pas à chaque fois faire entrer les coordonnées d'un utilisateur déjà connecté
    
    this.isLoggedIn = true;
    this.loggedUser = login;
    //this.getUserRole(login);
    
  }

  // getUserRole(ch:string){

    
  //   this.users.forEach((curUser) =>{
  //     if( curUser.email == ch){
  //       this.roles = curUser.role;
  //     }
  //   })
  // }

 

}