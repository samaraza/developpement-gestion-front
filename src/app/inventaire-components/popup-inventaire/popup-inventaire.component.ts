import { HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inventaire } from 'src/app/models/inventaire';
import { LoginService } from 'src/app/services/login_service';
import { ProduitService } from 'src/app/services/produit_service';

@Component({
  selector: 'app-popup-inventaire',
  templateUrl: './popup-inventaire.component.html',
  styleUrls: ['./popup-inventaire.component.css']
})

export class PopupInventaireComponent implements OnInit {
  inventaireForm: FormGroup;
  isEditing = false;
  
  produits: any[] = [];

  constructor(
    private loginService: LoginService,
    private produitService: ProduitService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PopupInventaireComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.inventaireForm = this.fb.group({
      anneeScolaire: ['', Validators.required],
      commentaire: ['', Validators.required],
      date: ['', Validators.required],
      responsable: ['', Validators.required],
      produit: ['', Validators.required],
      quantiteRestante:['', Validators.required]

    });
  }

  getAllProduits(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
    });

    this.produitService.getAllProduits(headers).subscribe(
      data => {
        this.produits = data;
        if (this.isEditing) {
          this.prefillForm();
        }
      },
      error => {
        console.error('Error fetching produits:', error);
      }
    );
  }

  ngOnInit(): void {
    this.getAllProduits();
    if (this.data && this.data.inventaire && this.data.inventaire.id) {
      this.isEditing = true;
    }
  }

  prefillForm() {
    if (this.data && this.data.inventaire) {
      const inventaire = this.data.inventaire as Inventaire;
      this.inventaireForm.patchValue({
        anneeScolaire: inventaire.anneeScolaire,
        commentaire: inventaire.commentaire,
        date: inventaire.date,
        responsable: inventaire.responsable,
        produit: this.produits.find(f => f.id === inventaire.produit!.id),
        quantiteRestante:inventaire.quantiteRestante
      });
    }
  }

  submit() {
    if (this.inventaireForm.valid) {
      const formValue = this.inventaireForm.value;
      const payload = {
        anneeScolaire: formValue.anneeScolaire,
        commentaire: formValue.commentaire,
        date: formValue.date,
        responsable: formValue.responsable,
        produit: formValue.produit,
        quantiteRestante:formValue.quantiteRestante
      };

      this.dialogRef.close(payload);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}

