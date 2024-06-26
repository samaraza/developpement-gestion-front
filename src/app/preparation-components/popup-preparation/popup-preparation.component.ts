import { HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Preparation } from 'src/app/models/preparation';
import { LoginService } from 'src/app/services/login_service';
import { ProduitService } from 'src/app/services/produit_service';
import { quantityValidator } from 'src/validator';

@Component({
  selector: 'app-popup-preparation',
  templateUrl: './popup-preparation.component.html',
  styleUrls: ['./popup-preparation.component.css']
})

export class PopupPreparationComponent implements OnInit {
  preparationForm: FormGroup;
  produits: any[] = [];
  isEditing = false; // Variable pour suivre si le formulaire est utilisé pour l'édition

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PopupPreparationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private produitService: ProduitService,
    private loginService: LoginService
  ) {
    this.preparationForm = this.fb.group({
      designation: ['', Validators.required],
      date: ['', Validators.required],
      produit1: ['', Validators.required],
      quantite1: ['', Validators.required],
      produit2: ['', Validators.required],
      quantite2: ['', Validators.required],
      quantite: ['', Validators.required],
    }, { validators: [quantityValidator('produit2', 'quantite2'),quantityValidator('produit1', 'quantite1') ]});
  }

  ngOnInit(): void {
    if (this.data && this.data.preparation.id) {
      this.isEditing = true;
      this.loadData();
    } else {
      this.getAllProduits();
    }
  }

  loadData(): void {
      this.getAllProduits().then(() => {
        const preparation = this.data.preparation as Preparation;
        this.preparationForm.patchValue({
          designation: preparation.designation,
          date: preparation.date,
          produit1: this.produits.find(f => f.id === preparation.produit1!.id),
          quantite1: preparation.quantite1,
          produit2: this.produits.find(f => f.id === preparation.produit2!.id),
          quantite2: preparation.quantite2,
          quantite: preparation.quantite,
        });
      });
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

  submit() {
    if (this.preparationForm.valid) {
      const formValue = this.preparationForm.value;
      const payload = {
        id: this.data.preparation.id,
        designation: formValue.designation,
        date: formValue.date,
        produit1: formValue.produit1,
        quantite1: formValue.quantite1,
        produit2: formValue.produit2,
        quantite2: formValue.quantite2,
        quantite: formValue.quantite,
      };
      this.dialogRef.close(payload);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}

