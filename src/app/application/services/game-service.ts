import { Service, signal,inject } from '@angular/core';
import { Game } from '../models/game';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
const URL="http://localhost:3000/games";
@Service()
export class GameService {
private _http = inject(HttpClient);
private _games = signal<Game[]>([]);

// Signal public en lecture seule
games = this._games.asReadonly();

// Ajouter un jeu
addGame(game: Game):Observable<Game> {
    return this._http.post<Game>(URL, game).pipe(
        tap(jeu=>this._games.update(games => [...games, jeu]))
    )    
}

getGames():Observable<Game[]>{
    return this._http.get<Game[]>(URL).pipe(
        tap(jeux => this._games.set(jeux))
    )
}
}
