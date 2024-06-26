import { UserService } from 'src/app/services/user_service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpHeaders } from '@angular/common/http';
import { Tp } from 'src/app/models/tp';
import { User } from 'src/app/models/user';
import { Produit } from 'src/app/models/produit';
import { PreparationService } from 'src/app/services/preparation_service';
import { ProduitService } from 'src/app/services/produit_service';
import { LoginService } from 'src/app/services/login_service';
import { Preparation } from 'src/app/models/preparation';
import { TpType } from 'src/app/enums/tp_type';
import { NiveauScolaire } from 'src/app/enums/niveau_scolaire';
import { SalleTpService } from 'src/app/services/salletp_service';
import { SalleTp } from 'src/app/models/salletp';

@Component({
  selector: 'app-popup-tp',
  templateUrl: './popup-tp.component.html',
  styleUrls: ['./popup-tp.component.css']
})

export class PopupTpComponent implements OnInit {
  tpForm: FormGroup;
  produits: Produit[] = [];
  preparations: Preparation[] = [];
  users: User[] = [];
  sallesTps: SalleTp[]=[];
  tpTypes = Object.keys(TpType);
  niveauScolaires = Object.keys(NiveauScolaire); 




  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PopupTpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private produitService: ProduitService,
    private preparationService: PreparationService,
    private loginService: LoginService,
    private userService : UserService,
    private salleTpService: SalleTpService // <-- Add this line

  ) {
    this.tpForm = this.fb.group({
      type: ['', Validators.required],
      jourTp: ['', Validators.required],
      prof: ['', Validators.required],
      salleTp: ['', Validators.required],
      niveauScolaire: ['', Validators.required],
      produits: this.fb.array([], Validators.required),
      preparations: this.fb.array([], Validators.required)
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.tp.id) {
      this.isEditing = true;
      this.loadData();
    } else {
      this.getAllUsers();
      this.getAllProduits();
      this.getAllPreparations();
      this.getAllSalleTps();
    }
  }

  loadData(): void {
    this.getAllUsers().then(() => {
      this.getAllProduits().then(() => {
        this.getAllPreparations().then(() => {
          this.getAllSalleTps().then(() => { 
            const tp = this.data.tp as Tp;
            this.tpForm.patchValue({
              type: tp.type,
              jourTp: tp.jourTp,
              prof: tp.prof,
              salleTp: this.sallesTps.find(f => f.id === tp.salleTp!.id),
              niveauScolaire: tp.niveauScolaire
            });
  
            tp.produits?.forEach(p => {
              const produit = this.produits.find(pc => pc.id === p.produit!.id);
              this.addProduit(produit, p.quantite);
            });
  
            tp.preparations?.forEach(p => {
              const preparation = this.preparations.find(pc => pc.id === p.preparation!.id);
              this.addPreparation(preparation, p.quantite);
            });
          });
        });
      });
    });
  }

  get produitsFormArray(): FormArray {
    return this.tpForm.get('produits') as FormArray;
  }

  addProduit(produit?: Produit, quantite?: number): void {
    const produitFormGroup = this.fb.group({
      produit: [produit || '', Validators.required],
      quantite: [quantite || '', Validators.required]
    });
    this.produitsFormArray.push(produitFormGroup);
  }

  removeProduit(index: number): void {
    this.produitsFormArray.removeAt(index);
  }

  get preparationsFormArray(): FormArray {
    return this.tpForm.get('preparations') as FormArray;
  }

  addPreparation(preparation?: Preparation, quantite?: number): void {
    const preparationFormGroup = this.fb.group({
      preparation: [preparation || '', Validators.required],
      quantite: [quantite || '', Validators.required]
    });
    this.preparationsFormArray.push(preparationFormGroup);
  }

  removePreparation(index: number): void {
    this.preparationsFormArray.removeAt(index);
  }

  getAllProduits(): Promise<void> {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
      });

      this.produitService.getAllProduits(headers).subscribe(
        data => {
          this.produits = data;
          resolve();
        },
        error => {
          console.error('Error fetching produits:', error);
          reject(error);
        }
      );
    });
  }

  getAllPreparations(): Promise<void> {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
      });

      this.preparationService.getAllPreparations(headers).subscribe(
        data => {
          this.preparations = data;
          resolve();
        },
        error => {
          console.error('Error fetching preparations:', error);
          reject(error);
        }
      );
    });
  }

  getAllSalleTps(): Promise<void> {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
      });
  
      this.salleTpService.geAllSalleTp(headers).subscribe(
        data => {
          this.sallesTps = data;
          resolve();
        },
        error => {
          console.error('Error fetching salleTps:', error);
          reject(error);
        }
      );
    });
  }

  getAllUsers(): Promise<void> {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
      });
      this.userService.getAllUsers(headers).subscribe(
        data => {
          this.users = data;
          resolve();
        },
        error => {
          console.error('Error fetching users:', error);
          reject(error);
        }
      );
  })}

  submit() {
    if (this.tpForm.valid) {
      const formValue = this.tpForm.value;
      const produits = formValue.produits.map((prod: any) => ({
        produit: prod.produit,
        quantite: prod.quantite
      }));
      const preparations = formValue.preparations.map((prep: any) => ({
        preparation: prep.preparation,
        quantite: prep.quantite
      }));

      const payload = {
        id: this.data.tp.id,
        type: formValue.type,
        jourTp: formValue.jourTp,
        prof: formValue.prof,
        salleTp: formValue.salleTp,
        niveauScolaire: formValue.niveauScolaire,
        produits: produits,
        preparations: preparations
      };
      this.dialogRef.close(payload);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
