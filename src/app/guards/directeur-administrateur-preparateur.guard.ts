import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login_service';
import { Role } from '../enums/role';

@Injectable({
  providedIn: 'root'
})
export class DirecteurAdmnistrateurPreparateurGuard implements CanActivate {
  constructor(private router:Router,private login : LoginService){}
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean{
      if(this.login.connectedUser.role == Role.DIRECTEUR ||this.login.connectedUser.role == Role.ADMINISTRATEUR || this.login.connectedUser.role == Role.PREPARATEUR){
        return true;
      }
      else{
        this.router.navigate(['autorisation'])
        return false;
      }
    }
}
