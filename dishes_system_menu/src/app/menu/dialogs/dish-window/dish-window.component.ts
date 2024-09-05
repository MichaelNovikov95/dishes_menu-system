import { Component, Inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../shared/services/categories/categories.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MenuService } from '../../../shared/services/menu/menu.service';
import { Dish } from '../../../shared/interfaces/menu.interface';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-dish-window',
  templateUrl: './dish-window.component.html',
  styleUrl: './dish-window.component.css',
})
export class DishWindowComponent implements OnInit {
  public categories: string[] = [];
  public id: string | null = null;
  public dish!: Observable<Dish>;

  constructor(
    private categoryService: CategoriesService,
    private menuService: MenuService,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) {
    this.categories = categoryService.categories;
    this.id = data.id;
  }

  ngOnInit(): void {
    if (this.id) {
      this.dish = this.menuService.getDishById(this.id).pipe(take(1));
    }
  }
}
