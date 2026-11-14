import { Component, inject, OnInit, signal } from '@angular/core';
import { form, FormRoot, FormField, required } from '@angular/forms/signals';
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
        }
  })
  readonly employeForm = form(this.modelEmploye, path=>{
    required(path.nom, {message:"Le nom est un champ obligatoire"}),
    required(path.matricule,{message:"Le matricule est unchamp obligatoire"})
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
          departement:Departement.Finance
        }
    })
  }
}
