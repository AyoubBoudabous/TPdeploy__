import { Component, inject, OnInit, signal } from '@angular/core';
import { Category } from '../../models/category';
import { Game } from '../../models/game';
import { applyEach, form, FormField, FormRoot, min, minLength, pattern, readonly, required } from '@angular/forms/signals';
import { GameService } from '../../services/game-service';
import { JsonPipe } from '@angular/common';

@Component({
  imports: [FormField, FormRoot, JsonPipe],
  selector: 'app-game-add',
  styleUrl: './game-add.css',
  templateUrl: './game-add.html',
})
export class GameAdd implements OnInit {
  private readonly gameService = inject(GameService);
  games = this.gameService.games;
  categories = Object.values(Category);

  readonly gameModel = signal<Game>({
    id: "",
    name: "",
    price: 0,
    madeIn: "Tunisie",
    category: Category.Puzzle,
    isNew: true,
    shops: []
  })
  readonly gameForm = form(this.gameModel, path => {
    required(path.name, { message: "Nom obligatoire" }),
      pattern(path.name, /^[A-Z].+$/, { message: "Le nom doit commencer par une majuscule" }),
      required(path.price, { message: "Le prix est obligatoire" }),
      min(path.price, 0.1, { message: "Le prix doit être supérieur à 0.1 DT" }),
      applyEach(path.shops, shop => {
        required(shop, {message: "Le nom du point de vente est obligatoire"}),
        minLength(shop,2, {
          message: "Taille minimale: 2 caractères"
        });
      });
  });

  onSubmit() {
    console.log(this.gameModel())
    if (this.gameForm().invalid())
      return;
    this.gameService.addGame(this.gameModel()).subscribe();
    this.resetForm();
  }
  ngOnInit(): void {
    this.gameService.getGames().subscribe()
  }
  resetForm() {
    this.gameModel.set({
      id: "",
      name: "",
      price: 0,
      madeIn: "Tunisie",
      category: Category.Puzzle,
      isNew: true,
      shops: []
    })
    this.gameForm().reset();
  }

  onAddShop() {
    this.gameModel.update(game => ({
      ...game,
      shops: [...game.shops, '']
    }));
  }
  onDeleteShop(index:number){
    this.gameModel.update( game=>({
      ...game,
      shops:game.shops.filter((s,i)=>i!=index)
    }))
  }
}
