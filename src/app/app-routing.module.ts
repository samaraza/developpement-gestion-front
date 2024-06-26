import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BodyComponent } from './body/body.component';
import { TableauComponent } from './labo-components/tableau/tableau.component';
import { TableauUsersComponent } from './user-components/tableau-users/tableau-users.component';
import { TableauSalletpComponent } from './salletp-components/tableau-salletp/tableau-salletp.component';
import { TableauArmoireComponent } from './armoire-components/tableau-armoire/tableau-armoire.component';
import { TableauFournisseurComponent } from './fournisseur-components/tableau-fournisseur/tableau-fournisseur.component';
import { TableauCommandeComponent } from './commande-components/tableau-commande/tableau-commande.component';
import { TableauProduitComponent } from './produit-components/tableau-produit/tableau-produit.component';
import { TableauPreparationComponent } from './preparation-components/tableau-preparation/tableau-preparation.component';
import { TableauTpComponent } from './tp-components/tableau-tp/tableau-tp.component';
import { TableauPostComponent } from './post-components/tableau-post/tableau-post.component';
import { TableauInventaireComponent } from './inventaire-components/tableau-inventaire/tableau-inventaire.component';
import { AutorizationComponent } from './autorization/autorization.component';
import { AdministrateurGuardGuard } from './guards/administrateur-guard.guard';
import { PreparateurProfesseurGuard } from './guards/preparateur-professeur.guard';
import { ProfesseurPreparateurDirecteurGuard } from './guards/professeur-preparateur-directeur';
import { AdministrateurDirecteurGuard } from './guards/administrateur-directeur.guard';
import { DirecteurAdmnistrateurPreparateurGuard } from './guards/directeur-administrateur-preparateur.guard';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'login',
    pathMatch : 'full',
  },
  {
    path : 'login',
    component : LoginComponent
  },

  {
    path : 'home',
    component : HomeComponent,
    children :[
      {
        path : '',
        component : BodyComponent,
        children:[
          { path: 'profile', component: ProfileComponent },
          { path: 'labo', component: TableauComponent,canActivate:[ProfesseurPreparateurDirecteurGuard],  },//2
          { path: 'salleTP', component: TableauSalletpComponent ,canActivate:[PreparateurProfesseurGuard]},//1
          { path: 'users', component: TableauUsersComponent ,canActivate:[AdministrateurDirecteurGuard]},
          { path: 'armoire', component: TableauArmoireComponent ,canActivate:[PreparateurProfesseurGuard,]},//1
          { path: 'fournisseur', component: TableauFournisseurComponent ,canActivate:[AdministrateurGuardGuard]},//3
          { path: 'commande', component: TableauCommandeComponent ,canActivate:[DirecteurAdmnistrateurPreparateurGuard]},//4
          { path: 'produit', component: TableauProduitComponent ,canActivate:[PreparateurProfesseurGuard,]},//1
          { path: 'preparation', component: TableauPreparationComponent,canActivate:[PreparateurProfesseurGuard,] },//1
          { path: 'tp', component: TableauTpComponent,canActivate:[PreparateurProfesseurGuard,] },//1
          { path: 'post', component: TableauPostComponent },
          { path: 'inventaire', component: TableauInventaireComponent },
          // { path: 'inventaire', component: TableauInventaireComponent ,canActivate: [AdministrateurGuardGuard,PreparateurGuardGuard]},
        ]
      },
    ]
  },
  { path: 'autorisation', component: AutorizationComponent ,},

  // { path: 'autorisation', component: AutorizationComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
