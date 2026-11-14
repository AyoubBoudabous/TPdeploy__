import { inject, Service, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Employe } from '../models/employe';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

const URL= `${environment.apiUrl}/employes`
@Service()
export class EmployeService {
    private readonly _employes=signal<Employe[]>([]);
    employes = this._employes.asReadonly();
    private readonly _http = inject(HttpClient);

    getEmployes():Observable<Employe[]>{
        return this._http.get<Employe[]>(URL).pipe(
            tap( employes=> this._employes.set(employes))
        )
    }

    addEmploye(e:Employe):Observable<Employe>{
        return this._http.post<Employe>(URL,e).pipe(
            tap(employe=> 
                this._employes.update( employes => [
                    ...employes, employe
                ])
            )
        )
    }
}
