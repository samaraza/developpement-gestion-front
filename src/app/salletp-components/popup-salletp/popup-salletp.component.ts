import { HttpHeaders } from '@angular/common/http';
import { ArmoireService } from './../../services/armoire_service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SalleTp } from 'src/app/models/salletp';
import { LoginService } from 'src/app/services/login_service';

@Component({
  selector: 'app-popup-salletp',
  templateUrl: './popup-salletp.component.html',
  styleUrls: ['./popup-salletp.component.css']
})

export class PopupSalletpComponent implements OnInit {
  salleTpForm: FormGroup;
  // laboTypes = Object.keys(LaboType); // Obtenir les types de labo de l'énumération
  armoires: any[] = []; // Définir le type de données approprié pour les salles TP
  isEditing = false; // Variable pour suivre si le formulaire est utilisé pour l'édition

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PopupSalletpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private armoireService: ArmoireService,
    private loginService: LoginService
  ) {
    this.salleTpForm = this.fb.group({
      numero: ['', Validators.required],
      armoires: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllArmoires();
  
    if (this.data && this.data.salleTp.id) {
      this.isEditing = true;
      const salleTp = this.data.salleTp as SalleTp;
      this.salleTpForm.patchValue({
        numero: salleTp.numero, 
        armoires: salleTp.armoires ? salleTp.armoires.map((salle: any) => salle.id) : []
      });
    }
  }
  
  

  getAllArmoires(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
    });

    this.armoireService.getAllArmoires(headers).subscribe(
      data => {
        this.armoires = data;
      },
      error => {
        console.error('Error fetching armoires:', error);
      }
    );
  }

  submit() {
    if (this.salleTpForm.valid) {
      const formValue = this.salleTpForm.value;
      const payload = {
        id: this.data.salleTp.id, 
        numero: formValue.numero,
        armoires: formValue.armoires.map((id: string) => ({ id })) // Transformation en format attendu
      };
      this.dialogRef.close(payload);
    }
  }
  

  close(): void {
    this.dialogRef.close();
  }
}

