import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Game } from '../models/game';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs';

const url = 'http://localhost:3000/games';

@Injectable({ providedIn: 'root' })
export class GameService {
  private readonly _http = inject(HttpClient);
  private readonly _games = signal<Game[]>([]);

  games = this._games.asReadonly();

  getGames(): Observable<Game[]> {
    return this._http.get<Game[]>(url).pipe(tap((games) => this._games.set(games)));
  }

  addGame(game: Game): Observable<Game> {
    return this._http
      .post<Game>(url, game)
      .pipe(tap((gameAdded) => this._games.update((game) => [...game, gameAdded])));
  }
}
