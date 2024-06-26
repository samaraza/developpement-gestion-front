import { Fournisseur } from "./founisseur";

export class Produit {
    id?: string;
    designation?: string;
    reference?: string;
    type?: string; // enum backend CHIMIQUE  ,  MATERIEL
    dateExp?: string;
    categorie?: string; // enum backend Acide , Base
    rubrique?: string; //  enum backend Acide1 , Acide2 , Base1 , Base2
    durabilite?: string; // enum backend Consommable , Durable
    quantiteInitiale?: number;
    fournisseur? : Fournisseur;
    uniteMesure? : string // enum backend  ml, l, g, kg, mm, m
}
