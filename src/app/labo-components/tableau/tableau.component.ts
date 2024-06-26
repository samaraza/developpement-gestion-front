import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { HttpHeaders } from '@angular/common/http';

import { PopupComponent } from '../popup/popup.component';
import { Labo } from '../../models/labo';
import { LaboService } from '../../services/labo_service';
import { LoginService } from '../../services/login_service';
import { SalleTpService } from '../../services/salletp_service';
import { SalleTp } from '../../models/salletp';
import { User } from 'src/app/models/user';
import { Role } from 'src/app/enums/role';

@Component({
  selector: 'app-tableau',
  templateUrl: './tableau.component.html',
  styleUrls: ['./tableau.component.css']
})
export class TableauComponent implements OnInit, AfterViewInit {
  labos: Labo[] = [];
  sallesTp: SalleTp[] = [];
  connectedUserRole?: Role ;
  roles = Object.keys(Role);


  dataSource: MatTableDataSource<Labo> = new MatTableDataSource<Labo>(this.labos);
  displayedColumns: string[] = ["laboType", "sallesTp",  "action"];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private laboService: LaboService, private loginService: LoginService, private salletpService: SalleTpService, private dialog: MatDialog) {}

  isLoading = false;

  ngOnInit(): void {
    this.connectedUserRole = this.loginService.connectedUser.role;
    this.getAllLabos();
  }

  // Get all labos
  public getAllLabos(): void {
    this.isLoading = true; // Début du chargement
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
    });

    this.laboService.geAllLabos(headers).subscribe(
      data => {
        this.labos = data;
        this.dataSource.data = this.labos; // Assignez les données récupérées à dataSource
        this.isLoading = false; // Fin du chargement
        console.log("dataaaa"+this.labos[0].salleTps![0].id);
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

  editLabo(labo: Labo) {
    this.openPopup('Modifier laboratoire', labo);
  }

  deleteLabo(id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
    });
    if (window.confirm("Vous êtes sûr de retirer le laboratoire de référence : " + id + " ?")) {
      this.laboService.deleteLabo(id, headers).subscribe(() => {
        this.getAllLabos();
      });
    }
  }

  addLabo() {
    this.openPopup('Ajouter une laboratoire');
  }
  
  openPopup(title: string, labo?: Labo) {
    if (labo) {
      const dialogRef = this.dialog.open(PopupComponent, {
        width: '40%',
        data: { title, labo }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log("mahmoudddd", result);
          const idLab = labo.id!;
          console.log("mahdiiii", idLab);
          this.updateLaboToServer(idLab, result); // Utiliser les nouvelles données actualisées
        }
      });
    } else {
      const dialogRef = this.dialog.open(PopupComponent, {
        width: '40%',
        data: { title ,labo: new Labo()}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.addLaboToServer(result); // Ajouter un nouveau laboratoire
        }
      });
    }
  }
  

  addLaboToServer(labo: any): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
    });

    this.laboService.addLabo(labo, headers).subscribe(() => {
      this.getAllLabos(); // Rafraîchir la liste des labos
    });
  }

  updateLaboToServer(id: any,labo :any): void {
    if (id) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
      });
  
      this.laboService.updateLabo(labo,id, headers).subscribe(() => {
        this.getAllLabos(); // Rafraîchir la liste des labos
      });
    }
  }
}
