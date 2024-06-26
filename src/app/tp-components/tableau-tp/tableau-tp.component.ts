import { HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Tp } from 'src/app/models/tp';
import { LoginService } from 'src/app/services/login_service';
import { TpService } from 'src/app/services/tp_service';
import { PopupTpComponent } from '../popup-tp/popup-tp.component';
import { Role } from 'src/app/enums/role';

@Component({
  selector: 'app-tableau-tp',
  templateUrl: './tableau-tp.component.html',
  styleUrls: ['./tableau-tp.component.css']
})

export class TableauTpComponent implements OnInit, AfterViewInit {
  tps: Tp[] = [];
  headers:any;
  connectedUserRole?: Role ;
  roles = Object.keys(Role);

  dataSource: MatTableDataSource<Tp> = new MatTableDataSource<Tp>(this.tps);
  displayedColumns: string[] = ["type","jourTp", "prof","salleTp","niveauScolaire","preparations", "quantites1","produits","quantites2", "action"];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private tpService: TpService, private loginService: LoginService, private dialog: MatDialog) {}

  isLoading = false;

  ngOnInit(): void {
    this.connectedUserRole = this.loginService.connectedUser.role;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
    });
    this.getAllTps();
  }
  

  // Get all salles de tp
  public getAllTps(): void {
    this.isLoading = true; // Début du chargement
    this.tpService.getAllTps(this.headers).subscribe(
      data => {
        this.tps = data;
        this.dataSource.data = this.tps; 
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

  editTp(tp: Tp) {
    this.openPopup('Modifier TP', tp);
  }

  deleteTp(id: number) {
    if (window.confirm("Vous êtes sûr de retirer le TP de référence : " + id + " ?")) {
      this.tpService.deleteTp(id, this.headers).subscribe(() => {
        this.getAllTps();
      });
    }
  }

  addTp() {
    this.openPopup('Ajouter uN tp');
  }
  
  openPopup(title: string, tp?: Tp) {
    if (tp) {
      const dialogRef = this.dialog.open(PopupTpComponent, {
        width: '40%',
        data: { title, tp }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const idTp = tp.id!;
          this.updateTpToServer(idTp, result); 
        }
      });
    } else {
      const dialogRef = this.dialog.open(PopupTpComponent, {
        width: '40%',
        data: { title ,tp: new Tp()}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.addTpToServer(result); // Ajouter un nouveau laboratoire
        }
      });
    }
  }
  

  addTpToServer(tp: any): void {
    console.log("tp"+tp);
    this.tpService.addTp(tp, this.headers).subscribe(() => {
      this.getAllTps(); 
    });
  }

  updateTpToServer(id: any,tp :any): void {
    if (id) {

      this.tpService.updateTp(tp,id, this.headers).subscribe(() => {
        this.getAllTps();
      });
    }
  }
}
