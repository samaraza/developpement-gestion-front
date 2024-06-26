import { Fournisseur } from "./founisseur";
import { ProduitCommande } from "./produit-commande";
import { User } from "./user";

export class Commande {
    id? : string;
    designation? : String;
    date? : String;
    observation? : String;
    numero? : String;
    fournisseur? : Fournisseur;
    user?:User;
    produits? : ProduitCommande[]
}
