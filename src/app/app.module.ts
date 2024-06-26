

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ProfileComponent } from './profile/profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { PopupComponent } from './labo-components/popup/popup.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TableauComponent } from './labo-components/tableau/tableau.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';  



import {HttpClientModule} from '@angular/common/http';
import { TableauUsersComponent } from './user-components/tableau-users/tableau-users.component';
import { PopupUsersComponent } from './user-components/popup-users/popup-users.component';
import { TableauSalletpComponent } from './salletp-components/tableau-salletp/tableau-salletp.component';
import { PopupSalletpComponent } from './salletp-components/popup-salletp/popup-salletp.component';
import { TableauArmoireComponent } from './armoire-components/tableau-armoire/tableau-armoire.component';
import { PopupArmoireComponent } from './armoire-components/popup-armoire/popup-armoire.component';
import { TableauFournisseurComponent } from './fournisseur-components/tableau-fournisseur/tableau-fournisseur.component';
import { PopupFournisseurComponent } from './fournisseur-components/popup-fournisseur/popup-fournisseur.component';
import { TableauCommandeComponent } from './commande-components/tableau-commande/tableau-commande.component';
import { PopupCommandeComponent } from './commande-components/popup-commande/popup-commande.component';
import { PopupProduitComponent } from './produit-components/popup-produit/popup-produit.component';
import { TableauProduitComponent } from './produit-components/tableau-produit/tableau-produit.component';
import { TableauPreparationComponent } from './preparation-components/tableau-preparation/tableau-preparation.component';
import { PopupPreparationComponent } from './preparation-components/popup-preparation/popup-preparation.component';
import { PopupTpComponent } from './tp-components/popup-tp/popup-tp.component';
import { TableauTpComponent } from './tp-components/tableau-tp/tableau-tp.component';
import { TableauPostComponent } from './post-components/tableau-post/tableau-post.component';
import { PopupPostComponent } from './post-components/popup-post/popup-post.component';
import { PopupInventaireComponent } from './inventaire-components/popup-inventaire/popup-inventaire.component';
import { TableauInventaireComponent } from './inventaire-components/tableau-inventaire/tableau-inventaire.component';
import { EditUserDialogComponent } from './profile/edit-user-dialog/edit-user-dialog.component';
import { AutorizationComponent } from './autorization/autorization.component';



@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    SidenavComponent,
    ProfileComponent,
    LoginComponent,
    HomeComponent,
    PopupComponent,
    TableauComponent,
    TableauUsersComponent,
    PopupUsersComponent,
    TableauSalletpComponent,
    PopupSalletpComponent,
    TableauArmoireComponent,
    PopupArmoireComponent,
    TableauFournisseurComponent,
    PopupFournisseurComponent,
    TableauCommandeComponent,
    PopupCommandeComponent,
    PopupProduitComponent,
    TableauProduitComponent,
    TableauPreparationComponent,
    PopupPreparationComponent,
    PopupTpComponent,
    TableauTpComponent,
    TableauPostComponent,
    PopupPostComponent,
    PopupInventaireComponent,
    TableauInventaireComponent,
    EditUserDialogComponent,
    AutorizationComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatIconModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
