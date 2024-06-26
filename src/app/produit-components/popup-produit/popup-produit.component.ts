import { HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from 'src/app/enums/category';
import { Durabilite } from 'src/app/enums/durabilite';
import { ProduitType } from 'src/app/enums/produit_type';
import { Rubrique } from 'src/app/enums/rubrique';
import { UniteMesure } from 'src/app/enums/uniteMesure';
import { Produit } from 'src/app/models/produit';
import { FournisseurService } from 'src/app/services/fournisseur_service';
import { LoginService } from 'src/app/services/login_service';

@Component({
  selector: 'app-popup-produit',
  templateUrl: './popup-produit.component.html',
  styleUrls: ['./popup-produit.component.css']
})
export class PopupProduitComponent implements OnInit {
  produitForm: FormGroup;
  isEditing = false;
  categories = Object.keys(Category);
  rubriques = Object.keys(Rubrique);
  durabilites = Object.keys(Durabilite);
  uniteMesures = Object.keys(UniteMesure);
  produitTypes = Object.keys(ProduitType);
  
  fournisseurs: any[] = [];

  constructor(
    private loginService: LoginService,
    private fournisseurService: FournisseurService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PopupProduitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.produitForm = this.fb.group({
      designation: ['', Validators.required],
      reference: ['', Validators.required],
      type: ['', Validators.required],
      dateExp: ['', Validators.required],
      categorie: ['', Validators.required],
      rubrique: ['', Validators.required],
      durabilite: ['', Validators.required],
      quantiteInitiale: ['', Validators.required],
      fournisseur: ['', Validators.required],
      uniteMesure: ['', Validators.required]
    });
  }

  getAllFournisseurs(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
    });

    this.fournisseurService.getAllFournisseurs(headers).subscribe(
      data => {
        this.fournisseurs = data;
        if (this.isEditing) {
          this.prefillForm();
        }
      },
      error => {
        console.error('Error fetching fournisseurs:', error);
      }
    );
  }

  ngOnInit(): void {
    this.getAllFournisseurs();
    if (this.data && this.data.produit && this.data.produit.id) {
      this.isEditing = true;
    }
  }

  prefillForm() {
    if (this.data && this.data.produit) {
      const produit = this.data.produit as Produit;
      this.produitForm.patchValue({
        designation: produit.designation,
        reference: produit.reference,
        type: produit.type,
        dateExp: produit.dateExp,
        categorie: produit.categorie,
        rubrique: produit.rubrique,
        durabilite: produit.durabilite,
        quantiteInitiale: produit.quantiteInitiale,
        fournisseur: this.fournisseurs.find(f => f.id === produit.fournisseur!.id),
        uniteMesure: produit.uniteMesure
      });
    }
  }

  submit() {
    if (this.produitForm.valid) {
      const formValue = this.produitForm.value;
      const payload = {
        designation: formValue.designation,
        reference: formValue.reference,
        dateExp: formValue.dateExp,
        type: formValue.type,
        quantiteInitiale: formValue.quantiteInitiale,
        categorie: formValue.categorie,
        rubrique: formValue.rubrique,
        durabilite: formValue.durabilite,
        uniteMesure: formValue.uniteMesure,
        fournisseur: formValue.fournisseur
      };

      this.dialogRef.close(payload);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
