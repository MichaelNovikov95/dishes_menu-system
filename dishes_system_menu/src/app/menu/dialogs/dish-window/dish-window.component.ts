import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Dish } from '../../../shared/interfaces/menu.interface';
import { AppState } from '../../../store/app.state';
import { getAllCategories } from '../../../store/categories/categories.action';
import { selectCategories } from '../../../store/categories/categories.selector';
import { getDishById } from '../../../store/dishes/dishes.action';
import { selectDish } from '../../../store/dishes/dishes.selector';

@Component({
  selector: 'app-dish-window',
  templateUrl: './dish-window.component.html',
  styleUrl: './dish-window.component.css',
})
export class DishWindowComponent implements OnInit {
  public categories$!: Observable<string[]>;
  public id: string | null = null;
  public dish$!: Observable<Dish | null>;

  constructor(
    private store: Store<AppState>,

    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) {
    this.id = data.id;
  }

  ngOnInit(): void {
    this.store.dispatch(getAllCategories());

    this.categories$ = this.store.select(selectCategories);

    if (this.id) {
      this.store.dispatch(getDishById({ id: this.id }));
      this.dish$ = this.store.select(selectDish);
    }
  }
}
