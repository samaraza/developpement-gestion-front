import { HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Armoire } from 'src/app/models/armoire';
import { Produit } from 'src/app/models/produit';
import { ArmoireService } from 'src/app/services/armoire_service';
import { LoginService } from 'src/app/services/login_service';
import { ProduitService } from 'src/app/services/produit_service';
import { PopupArmoireComponent } from '../popup-armoire/popup-armoire.component';
import { Role } from 'src/app/enums/role';

@Component({
  selector: 'app-tableau-armoire',
  templateUrl: './tableau-armoire.component.html',
  styleUrls: ['./tableau-armoire.component.css']
})

export class TableauArmoireComponent implements OnInit, AfterViewInit {
  produits: Produit[] = [];
  armoires: Armoire[] = [];

  dataSource: MatTableDataSource<Armoire> = new MatTableDataSource<Armoire>(this.armoires);
  displayedColumns: string[] = ["numero", "produits", "action"];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private armoireService: ArmoireService, private loginService: LoginService, private produitService: ProduitService, private dialog: MatDialog) {}

  isLoading = false;
  connectedUserRole?: Role ;
  roles = Object.keys(Role);


  ngOnInit(): void {
    this.connectedUserRole = this.loginService.connectedUser.role;
    this.getAllArmoires();
  }

  // Get all salles de tp
  public getAllArmoires(): void {
    this.isLoading = true; // Début du chargement
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
    });

    this.armoireService.getAllArmoires(headers).subscribe(
      data => {
        this.armoires = data;
        this.dataSource.data = this.armoires; // Assignez les données récupérées à dataSource
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

  editArmoire(armoire: Armoire) {
    this.openPopup('Modifier armoire', armoire);
  }

  deleteArmoire(id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
    });
    if (window.confirm("Vous êtes sûr de retirer l'armoire de référence : " + id + " ?")) {
      this.armoireService.deleteArmoire(id, headers).subscribe(() => {
        this.getAllArmoires();
      });
    }
  }

  addArmoire() {
    this.openPopup('Ajouter une armoire');
  }
  
  openPopup(title: string, armoire?: Armoire) {
    if (armoire) {
      const dialogRef = this.dialog.open(PopupArmoireComponent, {
        width: '40%',
        data: { title, armoire }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const idArmoire = armoire.id!;
          this.updateArmoireToServer(idArmoire, result); 
        }
      });
    } else {
      const dialogRef = this.dialog.open(PopupArmoireComponent, {
        width: '40%',
        data: { title ,armoire: new Armoire()}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.addArmoireToServer(result); // Ajouter un nouveau laboratoire
        }
      });
    }
  }
  

  addArmoireToServer(armoire: any): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
    });

    this.armoireService.addArmoire(armoire, headers).subscribe(() => {
      this.getAllArmoires(); 
    });
  }

  updateArmoireToServer(id: any,armoire :any): void {
    if (id) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
      });
  
      this.armoireService.updateArmoire(armoire,id, headers).subscribe(() => {
        this.getAllArmoires(); // Rafraîchir la liste des labos
      });
    }
  }
}

