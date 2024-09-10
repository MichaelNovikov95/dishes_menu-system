import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
// import { CategoriesService } from '../../../shared/services/categories/categories.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MenuService } from '../../../shared/services/menu/menu.service';
import { Dish } from '../../../shared/interfaces/menu.interface';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
// import { AppState } from '../../../store/reducers/index.reducer';

@Component({
  selector: 'app-dish-window',
  templateUrl: './dish-window.component.html',
  styleUrl: './dish-window.component.css',
})
export class DishWindowComponent implements OnInit, OnDestroy {
  public categories: string[] = [];
  public id: string | null = null;
  public dish!: Observable<Dish>;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    // private categoryService: CategoriesService,
    // private store: Store<AppState>,
    private menuService: MenuService,

    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) {
    this.id = data.id;
    // console.log(this.store);
  }

  ngOnInit(): void {
    // this.categoryService.currentCategories
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((categories) => {
    //     this.categories = categories;
    //   });

    if (this.id) {
      this.dish = this.menuService.getDishById(this.id).pipe(take(1));
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
