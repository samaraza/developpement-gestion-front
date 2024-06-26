import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HttpHeaders } from '@angular/common/http';

import { User } from '../../models/user';
import { UserService } from 'src/app/services/user_service';
import { LoginService } from 'src/app/services/login_service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LaboService } from 'src/app/services/labo_service';
import { PopupUsersComponent } from '../popup-users/popup-users.component';
import { Role } from 'src/app/enums/role';


@Component({
  selector: 'app-tableau-users',
  templateUrl: './tableau-users.component.html',
  styleUrls: ['./tableau-users.component.css']
})
export class TableauUsersComponent implements OnInit, AfterViewInit {
  users: User[] = [];

  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>(this.users);
  displayedColumns: string[] = ["firstName", "lastName","email","role", "action"];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService, private loginService: LoginService, private dialog: MatDialog) {}

  isLoading = false;

  ngOnInit(): void {
    this.getAllUsers();
  }

  public getAllUsers(): void {
    this.isLoading = true; // Début du chargement
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
    });
  
    this.userService.getAllUsers(headers).subscribe(
      data => {
        // Filtrer les utilisateurs selon le rôle et retirer l'utilisateur connecté de la liste
        this.users = (this.loginService.connectedUser.role == Role.DIRECTEUR) ?
          data.filter((user: User) => (user.role === Role.PREPARATEUR || user.role === Role.PROFFESSEUR))
          .filter((user: User) => user.id !== this.loginService.connectedUser.id) // Retirer l'utilisateur connecté
          : data.filter((user: User) => user.id !== this.loginService.connectedUser.id); // Retirer l'utilisateur connecté
  
        this.dataSource.data = this.users; // Assignez les données filtrées à dataSource
        this.isLoading = false; // Fin du chargement
      },
      error => {
        console.error('Error fetching labos:', error);
        this.isLoading = false; // Fin du chargement
      }
    );
  }
  

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  Filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = value;
  }

  editUser(user: User) {
    this.openPopup('Modifier utilisateur', user);
  }

  deleteUser(id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
    });
    if (window.confirm("Vous êtes sûr de retirer l'utilisateur de référence : " + id + " ?")) {
      this.userService.deleteUser(id, headers).subscribe(() => {
        this.getAllUsers();
      });
    }
  }

  addUser() {
    this.openPopup('Ajouter un utilisateur');
  }
  
openPopup(title: string, user?: User) {
  if (user) {
    const dialogRef = this.dialog.open(PopupUsersComponent, {
      width: '40%',
      data: { title, user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const idUser = user.id!;
        result.password = user.password;
        console.log("result.password"+result.password);
        this.updateUserToServer(idUser, result); // Utiliser les nouvelles données actualisées
      }
    });
  } else {
    const dialogRef = this.dialog.open(PopupUsersComponent, {
      width: '40%',
      data: { title, user: new User() } // Initialize with an empty user object
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addUserToServer(result); // Ajouter un nouveau laboratoire
      }
    });
  }
}

  

  addUserToServer(user: any): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
    });

    this.userService.addUser(user, headers).subscribe(() => {
      this.getAllUsers(); // Rafraîchir la liste des labos
    });
  }

  updateUserToServer(id: any,user :any): void {
    console.log("user.password" + user.password);
    if (id) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
      });

  
      this.userService.updateFromAdmin(user,id, headers).subscribe(() => {
        this.getAllUsers(); // Rafraîchir la liste des labos
      });
    }
  }
}
