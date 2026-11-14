import { Service, signal,inject } from '@angular/core';
import { Game } from '../models/game';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
const URL= `${environment.apiUrl}/games`;
@Service()
export class GameService {
private _http = inject(HttpClient);
private _games = signal<Game[]>([]);

games = this._games.asReadonly();

addGame(game: Game):Observable<Game> {
    return this._http.post<Game>(URL, game).pipe(
        tap(jeu=>this._games.update(games => [...games, jeu]))
    )    
}

getGames():Observable<Game[]>{
    console.log(URL)
    return this._http.get<Game[]>(URL).pipe(
        tap(jeux => this._games.set(jeux))
    )
}
}
