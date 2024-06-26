import { HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Armoire } from 'src/app/models/armoire';
import { LoginService } from 'src/app/services/login_service';
import { ProduitService } from 'src/app/services/produit_service';

@Component({
  selector: 'app-popup-armoire',
  templateUrl: './popup-armoire.component.html',
  styleUrls: ['./popup-armoire.component.css']
})

export class PopupArmoireComponent implements OnInit {
  armoireForm: FormGroup;
  produits: any[] = []; 
  isEditing = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PopupArmoireComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private produitService: ProduitService,
    private loginService: LoginService
  ) {
    this.armoireForm = this.fb.group({
      numero: ['', Validators.required],
      produits: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllProduits();
  
    if (this.data && this.data.armoire.id) {
      this.isEditing = true;
      const armoire = this.data.armoire as Armoire;
      this.armoireForm.patchValue({
        numero: armoire.designation,
        produits: armoire.produits ? armoire.produits.map((produit: any) => produit.id) : []
      });
    }
  }
  
  

  getAllProduits(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
    });

    this.produitService.getAllProduits(headers).subscribe(
      data => {
        this.produits = data;
      },
      error => {
        console.error('Error fetching produits:', error);
      }
    );
  }

  submit() {
    if (this.armoireForm.valid) {
      const formValue = this.armoireForm.value;
      const payload = {
        id: this.data.armoire.id, 
        designation: formValue.numero,
        produits: formValue.produits.map((id: string) => ({ id })) 
      };
      this.dialogRef.close(payload);
    }
  }
  

  close(): void {
    this.dialogRef.close();
  }
}


