import { HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Role } from 'src/app/enums/role';
import { Commande } from 'src/app/models/commande';
import { User } from 'src/app/models/user';
import { FournisseurService } from 'src/app/services/fournisseur_service';
import { LoginService } from 'src/app/services/login_service';
import { ProduitService } from 'src/app/services/produit_service';
import { UserService } from 'src/app/services/user_service';

@Component({
  selector: 'app-popup-commande',
  templateUrl: './popup-commande.component.html',
  styleUrls: ['./popup-commande.component.css']
})
export class PopupCommandeComponent implements OnInit {
  commandeForm: FormGroup;
  produits: any[] = [];
  fournisseurs: any[] = [];
  directeurs : any[] =[];
  isEditing = false; // Variable pour suivre si le formulaire est utilisé pour l'édition

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PopupCommandeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private produitService: ProduitService,
    private fournisseurService: FournisseurService,
    private userService: UserService,
    private loginService: LoginService
  ) {
    this.commandeForm = this.fb.group({
      numero: ['', Validators.required],
      date: ['', Validators.required],
      observation: ['', Validators.required],
      designation: ['', Validators.required],
      fournisseur: ['', Validators.required],
      directeur: ['', Validators.required],
      produits: this.fb.array([],Validators.required) // Initialise un FormArray pour les produits
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.commande.id) {
      this.isEditing = true;
      this.loadData();
    } else {
      this.getAllFournisseurs();
      this.getAllDirecteurs();
      this.getAllProduits();
    }
  }
  loadData(): void {
    this.getAllDirecteurs().then(() => {
      this.getAllFournisseurs().then(() => {
        this.getAllProduits().then(() => {
          const commande = this.data.commande as Commande;
          this.commandeForm.patchValue({
            designation: commande.designation,
            date: commande.date,
            observation: commande.observation,
            numero: commande.numero,
            directeur: commande.user ? this.directeurs.find(f => f.id === commande.user!.id) : null,
            fournisseur: commande.fournisseur ? this.fournisseurs.find(f => f.id === commande.fournisseur!.id) : null
          });
          console.log(this.commandeForm.value.directeur);
  
          commande.produits?.forEach(pc => {
            const produit = this.produits.find(p => p.id === pc.produit!.id);
            this.addProduit(produit, pc.quantiteAjoutee);
          });
        });
      });
    });
  }
  

  get produitsFormArray(): FormArray {
    return this.commandeForm.get('produits') as FormArray;
  }

  addProduit(produit?: any, quantiteAjoutee?: number): void {
    const produitFormGroup = this.fb.group({
      produit: [produit || '', Validators.required],
      quantiteAjoutee: [quantiteAjoutee || '', Validators.required]
    });

    this.produitsFormArray.push(produitFormGroup);
  }

  removeProduit(index: number): void {
    this.produitsFormArray.removeAt(index);
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

  getAllFournisseurs(): Promise<void> {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
      });

      this.fournisseurService.getAllFournisseurs(headers).subscribe(
        data => {
          this.fournisseurs = data;
          resolve();
        },
        error => {
          console.error('Error fetching fournisseurs:', error);
          reject(error);
        }
      );
    });
  }

  
  getAllDirecteurs(): Promise<void> {
    return new Promise((resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
      });
  
      this.userService.getAllUsers(headers).subscribe(
        data => {
          this.directeurs = data.filter((user: User) => user.role === Role.DIRECTEUR);
          resolve();
        },
        error => {
          console.error('Error fetching directeurs:', error);
          reject(error);
        }
      );
    });
  }
  

  submit() {
    if (this.commandeForm.valid) {
      const formValue = this.commandeForm.value;
      const produits = formValue.produits.map((prod: any) => ({
        produit: prod.produit,
        quantiteAjoutee: prod.quantiteAjoutee
      }));

      const payload = {
        id: this.data.commande.id,
        designation: formValue.designation,
        date: formValue.date,
        observation: formValue.observation,
        numero: formValue.numero,
        fournisseur: formValue.fournisseur,
        user:formValue.directeur,
        produits: produits
      };
      this.dialogRef.close(payload);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
