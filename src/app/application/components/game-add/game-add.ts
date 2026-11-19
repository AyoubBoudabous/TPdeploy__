import { Component, inject, signal } from '@angular/core';
import { Category } from '../../models/category';
import { Game } from '../../models/game';
import { form, FormRoot, FormField, required, min, pattern } from '@angular/forms/signals';
import { JsonPipe } from '@angular/common';
import { GameService } from '../../servive/game-service';
@Component({
  imports: [FormRoot, FormField, JsonPipe],
  selector: 'app-game-add',
  styleUrl: './game-add.css',
  templateUrl: './game-add.html',
})
export class GameAdd {
  categories = Object.values(Category);
  private readonly gamesService = inject(GameService);
  games = this.gamesService.games;

  ngOnInit(): void {
    this.gamesService.getGames().subscribe();
  }

  readonly gameModel = signal<Game>({
    id: '',
    name: '',
    price: 0,
    madeIn: 'Tunisie',
    category: Category.Puzzle,
    isNew: true,
    shops: [],
  });

  readonly gameForm = form(this.gameModel, (path) => {
    required(path.name, { message: 'Le nom est obligatoire' });
    pattern(path.name, /^[A-Z].+$/, { message: 'Le nom doit commencer par une majuscule !' });
    required(path.price, { message: 'Le prix est obligatoire' });
    min(path.price, 0.1, { message: 'Le prix doit être supérieur à 0.1' });
  });

  onSubmit() {
    this.gamesService.addGame(this.gameModel()).subscribe(() => this.resetForm());
  }
  resetForm() {
    this.gameModel.set({
      id: '',
      name: '',
      price: 0,
      madeIn: 'Tunisie',
      category: Category.Puzzle,
      isNew: true,
      shops: [],
    });
  }
}
