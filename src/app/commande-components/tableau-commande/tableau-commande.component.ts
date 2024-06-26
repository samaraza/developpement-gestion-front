import { HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Commande } from 'src/app/models/commande';
import { CommandeService } from 'src/app/services/commande_service';
import { LoginService } from 'src/app/services/login_service';
import { PopupCommandeComponent } from '../popup-commande/popup-commande.component';
import { Role } from 'src/app/enums/role';

@Component({
  selector: 'app-tableau-commande',
  templateUrl: './tableau-commande.component.html',
  styleUrls: ['./tableau-commande.component.css']
})


export class TableauCommandeComponent implements OnInit, AfterViewInit {
  commandes: Commande[] = [];
  headers:any;
  connectedUserRole?: Role ;
  roles = Object.keys(Role);

  dataSource: MatTableDataSource<Commande> = new MatTableDataSource<Commande>(this.commandes);
  displayedColumns: string[] = ["numero","designation", "date","observation","directeur","fournisseur","produits", "quantites", "action"];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private commandeService: CommandeService, private loginService: LoginService, private dialog: MatDialog) {}

  isLoading = false;

  ngOnInit(): void {
    this.connectedUserRole = this.loginService.connectedUser.role;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
    });
    this.getAllCommandes();
  }

  generatePDF(id: any) {
    console.log("dkhal " + id);
    this.commandeService.generatePDF(id, this.headers).subscribe(
      (response: any) => {
        console.log('PDF response:', response); // Log the response content
        // Handle the response, e.g., open the PDF in a new tab or download it
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      },
      (error: any) => {
        console.error('Error generating PDF:', error);
        // Handle error, e.g., show error message to user
      }
    );
  }
  

  // Get all salles de tp
  public getAllCommandes(): void {
    this.isLoading = true; // Début du chargement
    this.commandeService.getAllCommandes(this.headers).subscribe(
      data => {
        this.commandes = data;
        this.dataSource.data = this.commandes; // Assignez les données récupérées à dataSource
        this.isLoading = false; // Fin du chargement
      },
      error => {
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

  editCommande(commande: Commande) {
    this.openPopup('Modifier commande', commande);
  }

  deleteCommande(id: number) {
    if (window.confirm("Vous êtes sûr de retirer la commande de référence : " + id + " ?")) {
      this.commandeService.deleteCommande(id, this.headers).subscribe(() => {
        this.getAllCommandes();
      });
    }
  }

  addCommande() {
    this.openPopup('Ajouter une commande');
  }
  
  openPopup(title: string, commande?: Commande) {
    if (commande) {
      const dialogRef = this.dialog.open(PopupCommandeComponent, {
        width: '40%',
        data: { title, commande }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const idCommande = commande.id!;
          this.updateCommandeTpToServer(idCommande, result); 
        }
      });
    } else {
      const dialogRef = this.dialog.open(PopupCommandeComponent, {
        width: '40%',
        data: { title ,commande: new Commande()}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.addCommandeToServer(result); // Ajouter un nouveau laboratoire
        }
      });
    }
  }
  

  addCommandeToServer(commande: any): void {
    this.commandeService.addCommande(commande, this.headers).subscribe(() => {
      this.getAllCommandes(); 
    });
  }

  updateCommandeTpToServer(id: any,commande :any): void {
    if (id) {

      this.commandeService.updateCommande(commande,id, this.headers).subscribe(() => {
        this.getAllCommandes();
      });
    }
  }
}


