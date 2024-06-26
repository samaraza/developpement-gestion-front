import { HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Fournisseur } from 'src/app/models/founisseur';
import { FournisseurService } from 'src/app/services/fournisseur_service';
import { LoginService } from 'src/app/services/login_service';
import { PopupFournisseurComponent } from '../popup-fournisseur/popup-fournisseur.component';

@Component({
  selector: 'app-tableau-fournisseur',
  templateUrl: './tableau-fournisseur.component.html',
  styleUrls: ['./tableau-fournisseur.component.css']
})

export class TableauFournisseurComponent implements OnInit, AfterViewInit {
  fournisseurs: Fournisseur[] = [];
  headers: any;

  dataSource: MatTableDataSource<Fournisseur> = new MatTableDataSource<Fournisseur>(this.fournisseurs);
  displayedColumns: string[] = ["nom", "adresse","email","nmrTel", "action"];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fournisseurService: FournisseurService, private loginService: LoginService, private dialog: MatDialog) {}

  isLoading = false;

  ngOnInit(): void {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
    });
    this.getAllFournisseurs();
  }


  // Get all fournisseurs
  public getAllFournisseurs(): void {
    this.isLoading = true; // Début du chargement


    this.fournisseurService.getAllFournisseurs(this.headers).subscribe(
      data => {
        this.fournisseurs = data;
        this.dataSource.data = this.fournisseurs; // Assignez les données récupérées à dataSource
        this.isLoading = false; // Fin du chargement
      },
      error => {
        console.error('Error fetching fournisseurs:', error);
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

  editFournisseur(fournisseur: Fournisseur) {
    this.openPopup('Modifier fournisseur', fournisseur);
  }

  deleteFournisseur(id: number) {
    if (window.confirm("Vous êtes sûr de retirer l'utilisateur de référence : " + id + " ?")) {
      this.fournisseurService.deleteFournisseur(id, this.headers).subscribe(() => {
        this.getAllFournisseurs();
      });
    }
  }

  addFournisseur() {
    this.openPopup('Ajouter un fournisseur');
  }
  
openPopup(title: string, fournisseur?: Fournisseur) {
  if (fournisseur) {
    const dialogRef = this.dialog.open(PopupFournisseurComponent, {
      width: '40%',
      data: { title, fournisseur }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const idFournisseur = fournisseur.id!;
        this.updateFournisseurToServer(idFournisseur, result); // Utiliser les nouvelles données actualisées
      }
    });
  } else {
    const dialogRef = this.dialog.open(PopupFournisseurComponent, {
      width: '40%',
      data: { title, fournisseur: new Fournisseur() }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addFournisseurToServer(result); // Ajouter un nouveau laboratoire
      }
    });
  }
}

  

addFournisseurToServer(fournisseur: any): void {

    this.fournisseurService.addFournisseur(fournisseur, this.headers).subscribe(() => {
      this.getAllFournisseurs(); // Rafraîchir la liste des labos
    });
  }

  updateFournisseurToServer(id: any,fournisseur :any): void {
    if (id) {
  
      this.fournisseurService.updateFournisseur(fournisseur,id, this.headers).subscribe(() => {
        this.getAllFournisseurs(); // Rafraîchir la liste des labos
      });
    }
  }
}
