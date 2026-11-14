import { Affiliation } from "./affiliation";

export interface Employe {
    id:string;
    matricule:string;
    nom:string;
    affiliation: Affiliation;
}
