import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login_service';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../models/user';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from '../services/user_service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  user: User;

  constructor(private loginService: LoginService, private dialog: MatDialog, private userService: UserService) {
    this.user = this.loginService.connectedUser;
  }

  ngOnInit(): void {
    console.log("hahahahha"+this.loginService.connectedUser.id);
    // Any initialization logic if necessary
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      width: '400px',
      data: { user: this.user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update the user data if needed
        this.user = result;
        console.log(result);
        this.updateUserToServer(this.loginService.connectedUser.id, result); 

      }
    });
  }

  updateUserToServer(id: any,user :any): void {
    console.log("enter here");
    if (id) {
      console.log("enter here");
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
      });
      console.log("user" + user);
      if(user.password == ""){
         user.password =this.loginService.connectedUser.password
      }
      else{
        this.loginService.connectedUser.password =user.password;
      }
      this.userService.updateUser(user,id, headers).subscribe(() => {
        console.log("user" + user);
        this.loginService.connectedUser.email =user.email;


      });
    }
  }
}
