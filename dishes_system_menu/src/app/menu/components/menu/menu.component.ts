import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, debounceTime, filter, take, takeUntil } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

import { ItemWindowComponent } from '../../dialogs/item-window/item-window.component';
import { MenuService } from '../../../shared/services/menu/menu.service';
import { Dish } from '../../../shared/interfaces/menu.interface';
import { WordNormalizer } from '../../../shared/pipes/word_normalizer.pipe';
import { CategoriesService } from '../../../shared/services/categories/categories.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  providers: [WordNormalizer],
})
export class MenuComponent implements OnInit, OnDestroy {
  public menu: Dish[] = [];
  public filteredMenu: Dish[] = [];
  public categories: string[] = [];
  public choosenCategory: string[] = [];
  public searcher = new FormControl('', [Validators.minLength(3)]);

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private menuService: MenuService,
    public dialog: MatDialog,
    private wordNormalizer: WordNormalizer,
    private categoryService: CategoriesService
  ) {
    this.categories = categoryService.categories;
  }

  ngOnInit(): void {
    this.menuService.currentDishes
      .pipe(takeUntil(this.destroy$))
      .subscribe((dishes) => {
        this.menu = dishes;
      });

    this.searcher.valueChanges
      .pipe(
        debounceTime(500),
        filter(() => this.searcher.valid),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.getFilteredMenu();
      });
  }

  public filterByCategory(categories: string[]) {
    this.choosenCategory = categories;
    this.getFilteredMenu();
  }

  private getFilteredMenu(): void {
    const normalizedDishName = this.wordNormalizer.transform(
      this.searcher.value
    );

    this.menuService.getAllDishes(this.choosenCategory, normalizedDishName);

    this.menuService.currentDishes.pipe(take(1)).subscribe((data) => {
      this.filteredMenu = data;
    });
  }

  public openDialog(id: string): void {
    this.dialog.open(ItemWindowComponent, {
      width: '1100px',
      data: { id },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
