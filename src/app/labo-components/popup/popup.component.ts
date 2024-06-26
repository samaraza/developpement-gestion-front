import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalleTpService } from '../../services/salletp_service';
import { HttpHeaders } from '@angular/common/http';
import { LoginService } from '../../services/login_service';
import { LaboType } from '../../models/labotype';
import { Labo } from '../../models/labo';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  laboForm: FormGroup;
  laboTypes = Object.keys(LaboType); // Obtenir les types de labo de l'énumération
  sallesTp: any[] = []; // Définir le type de données approprié pour les salles TP
  isEditing = false; // Variable pour suivre si le formulaire est utilisé pour l'édition

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private salleTpService: SalleTpService,
    private loginService: LoginService
  ) {
    this.laboForm = this.fb.group({
      laboType: ['', Validators.required],
      sallesTp: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllSalleTp();
  
    if (this.data && this.data.labo.id) {
      this.isEditing = true;
      const labo = this.data.labo as Labo;
      this.laboForm.patchValue({
        laboType: labo.laboType,
        sallesTp: labo.salleTps ? labo.salleTps.map((salle: any) => salle.id) : []
      });
    }
  }
  
  

  getAllSalleTp(): void {
    // Remplacez avec les informations d'authentification appropriées
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + btoa(this.loginService.connectedUser.email + ':' + this.loginService.connectedUser.password)
    });

    this.salleTpService.geAllSalleTp(headers).subscribe(
      data => {
        this.sallesTp = data;
        console.log("mahdiiii"+this.sallesTp)
      },
      error => {
        console.error('Error fetching sallesTp:', error);
      }
    );
  }

  submit() {
    console.log("enter submit"+this.data.labo.id);
    if (this.laboForm.valid) {
      const formValue = this.laboForm.value;
      console.log("hey"+this.data.labo.id);
      const payload = {
        id: this.data.labo.id, // Include the id of the labo
        laboType: formValue.laboType,
        salleTps: formValue.sallesTp.map((id: string) => ({ id })) // Transformation en format attendu
      };
      console.log('Payload:', payload); // Log the payload
      this.dialogRef.close(payload);
    }
  }
  

  close(): void {
    this.dialogRef.close();
  }
}
