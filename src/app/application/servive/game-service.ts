import { HttpClient } from '@angular/common/http';
import { Service, inject, signal } from '@angular/core';
import { Game } from '../models/game';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';

const url = environment.apiUrl ;

@Service()
export class GameService {
    private readonly _http = inject(HttpClient);
    private readonly _games = signal<Game[]>([]);
    
    games = this._games.asReadonly();


    getGames() : Observable<Game[]> {
        return this._http.get<Game[]>(url);
    }

    addGame(game: Game) : Observable<Game> {
        return this._http.post<Game>(url, game);
    } 
}
