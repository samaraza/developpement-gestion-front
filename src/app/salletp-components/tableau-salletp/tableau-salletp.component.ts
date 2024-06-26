import { HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Produit } from 'src/app/models/produit';
import { SalleTp } from 'src/app/models/salletp';
import { LoginService } from 'src/app/services/login_service';
import { ProduitService } from 'src/app/services/produit_service';
import { SalleTpService } from 'src/app/services/salletp_service';
import { PopupSalletpComponent } from '../popup-salletp/popup-salletp.component';
import { Armoire } from 'src/app/models/armoire';
import { Role } from 'src/app/enums/role';

@Component({
  selector: 'app-tableau-salletp',
  templateUrl: './tableau-salletp.component.html',
  styleUrls: ['./tableau-salletp.component.css']
})

export class TableauSalletpComponent implements OnInit, AfterViewInit {
  salletps: SalleTp[] = [];
  armoires: Armoire[] = [];

  dataSource: MatTableDataSource<SalleTp> = new MatTableDataSource<SalleTp>(this.salletps);
  displayedColumns: string[] = ["numero", "armoires", "action"];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private salleTpService: SalleTpService, private loginService: LoginService, private produitService: ProduitService, private dialog: MatDialog) {}

  isLoading = false;
  connectedUserRole?: Role ;
  roles = Object.keys(Role);

  ngOnInit(): void {
    this.connectedUserRole = this.loginService.connectedUser.role;
    console.log(this.connectedUserRole+"voilaaaaa")
    this.getAllSalleTps();
  }

  // Get all salles de tp
  public getAllSalleTps(): void {
    this.isLoading = true; // Début du chargement
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
    });

    this.salleTpService.geAllSalleTp(headers).subscribe(
      data => {
        this.salletps = data;
        this.dataSource.data = this.salletps; // Assignez les données récupérées à dataSource
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

  editSalleTp(salleTp: SalleTp) {
    this.openPopup('Modifier salle de TP', salleTp);
  }

  deleteSalleTp(id: number) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
    });
    if (window.confirm("Vous êtes sûr de retirer la salle de Tp de référence : " + id + " ?")) {
      this.salleTpService.deleteSalleTp(id, headers).subscribe(() => {
        this.getAllSalleTps();
      });
    }
  }

  addSalleTp() {
    this.openPopup('Ajouter une salle de TP');
  }
  
  openPopup(title: string, salleTp?: SalleTp) {
    if (salleTp) {
      const dialogRef = this.dialog.open(PopupSalletpComponent, {
        width: '40%',
        data: { title, salleTp }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const idSalleTp = salleTp.id!;
          console.log("mahdiiii", idSalleTp);
          this.updateSalleTpToServer(idSalleTp, result); // Utiliser les nouvelles données actualisées
        }
      });
    } else {
      const dialogRef = this.dialog.open(PopupSalletpComponent, {
        width: '40%',
        data: { title ,salleTp: new SalleTp()}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.addSalleTpToServer(result); // Ajouter un nouveau laboratoire
        }
      });
    }
  }
  

  addSalleTpToServer(salleTp: any): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
    });

    this.salleTpService.addSalleTp(salleTp, headers).subscribe(() => {
      this.getAllSalleTps(); 
    });
  }

  updateSalleTpToServer(id: any,salleTp :any): void {
    if (id) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
      });
  
      this.salleTpService.updateSalleTp(salleTp,id, headers).subscribe(() => {
        this.getAllSalleTps(); // Rafraîchir la liste des labos
      });
    }
  }
}

