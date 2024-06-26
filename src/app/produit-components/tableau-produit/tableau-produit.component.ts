import { HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Produit } from 'src/app/models/produit';
import { ProduitService } from 'src/app/services/produit_service';
import { LoginService } from 'src/app/services/login_service';
import { PopupProduitComponent } from '../popup-produit/popup-produit.component';
import { Role } from 'src/app/enums/role';

@Component({
  selector: 'app-tableau-produit',
  templateUrl: './tableau-produit.component.html',
  styleUrls: ['./tableau-produit.component.css']
})
export class TableauProduitComponent implements OnInit, AfterViewInit {
  produits: Produit[] = [];
  headers:any;
  connectedUserRole?: Role ;
  roles = Object.keys(Role);

  isEmpty(value: any): boolean {
    return value == null || value === '';
}

  dataSource: MatTableDataSource<Produit> = new MatTableDataSource<Produit>(this.produits);
  displayedColumns: string[] = ["designation", "reference", "type", "dateExp", "categorie", "rubrique", "durabilite", "quantiteInitiale", "fournisseur", "uniteMesure", "action"];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private produitService: ProduitService, private loginService: LoginService, private dialog: MatDialog) {}

  isLoading = false;

  ngOnInit(): void {
    this.connectedUserRole = this.loginService.connectedUser.role;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
    });
    this.getAllProduits();
  }

  public getAllProduits(): void {
    this.isLoading = true;
    this.produitService.getAllProduits(this.headers).subscribe(
      data => {
        this.produits = data;
        this.dataSource.data = this.produits;
        this.isLoading = false;
      },
      error => {
        this.isLoading = false;
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

  editProduit(produit: Produit) {
    this.openPopup('Modifier produit', produit);
  }

  deleteProduit(id: number) {
    if (window.confirm("Vous êtes sûr de supprimer le produit avec l'ID : " + id + " ?")) {
      this.produitService.deleteProduit(id, this.headers).subscribe(() => {
        this.getAllProduits();
      });
    }
  }

  addProduit() {
    this.openPopup('Ajouter un produit');
  }

  openPopup(title: string, produit?: Produit) {
    if (produit) {
      const dialogRef = this.dialog.open(PopupProduitComponent, {
        width: '40%',
        data: { title, produit }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const idProduit = produit.id!;
          
          this.updateProduitToServer(idProduit, result); // Utiliser les nouvelles données actualisées
        }
      });
    } else {
      const dialogRef = this.dialog.open(PopupProduitComponent, {
        width: '40%',
        data: { title ,produit: new Produit()}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.addProduitToServer(result); // Ajouter un nouveau laboratoire
        }
      });
    }
  }

  addProduitToServer(produit: any): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
    });

    this.produitService.addProduit(produit, headers).subscribe(() => {
      this.getAllProduits(); 
    });
  }

  updateProduitToServer(id: any,produit :any): void {
    if (id) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
      });
  
      this.produitService.updateProduit(produit,id, headers).subscribe(() => {
        this.getAllProduits(); // Rafraîchir la liste des labos
      });
    }
  }

}
