import { Component, inject, OnInit, signal } from '@angular/core';
import { form, FormRoot, FormField, required, applyEach, min, pattern } from '@angular/forms/signals';
import { Employe } from '../../models/employe';
import { Departement, Poste } from '../../models/types';
import { EmployeList } from '../employe-list/employe-list';
import { EmployeService } from '../../services/employe-service';

@Component({
  imports: [FormRoot, FormField, EmployeList],
  selector: 'app-employe-add',
  styleUrl: './employe-add.css',
  templateUrl: './employe-add.html',
})
export class EmployeAdd {

  postes = Object.values(Poste);
  private readonly employeService=inject(EmployeService);

  readonly modelEmploye= signal<Employe>({
        id:"",
        matricule:"",
        nom:"",
        affiliation: {
          poste: Poste.Technicien,
          departement:Departement.IT
        },
        diplomes:[]
  })
  readonly employeForm = form(this.modelEmploye, path=>{
    required(path.nom, {message:"Le nom est un champ obligatoire"}),
    required(path.matricule,{message:"Le matricule est unchamp obligatoire"}),
    applyEach(path.diplomes, diplome=>{
      required(diplome.intitule, {message:"le nom du diplôme est obligatoire"}),
      pattern(diplome.intitule, /^[a-zA-Z]{2,}$/, {message:"Le diplôme comporte au moins 2 lettres"})
      required(diplome.annee, {message:"Le nombre d'année est obligatoire"}),
      min(diplome.annee,1960,{message:"L'année est au minimum 1960"})
    })
  });

  onAddEmploye(){
    this.employeService.addEmploye(this.modelEmploye()).subscribe()
  }

  onVider(){
    this.modelEmploye.set({
        id:"",
        matricule:"",
        nom:"",
        affiliation: {
          poste: Poste.Secrétaire,
          departement:Departement.Finance,
        },
        diplomes:[]
    })
  }
  onAddDiplome(){
    this.modelEmploye.update(
      employe=>({
          ...employe,
          diplomes:[...employe.diplomes,{intitule:"", annee:1960} ] 
      })        
    )
  }
  onDeleteDiplome(indice:number){
    this.modelEmploye.update(
      employe=>({
        ...employe,
        diplomes:employe.diplomes.filter((dip,i)=>i!=indice)
      })
    )
  }
}
