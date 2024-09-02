import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription, debounceTime, map, of, take } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ItemWindowComponent } from '../../dialogs/item-window/item-window.component';
import { DataService } from '../../../shared/services/data.service';
import { Dish } from '../../../shared/interfaces/menu.interface';
import { WordNormalizer } from '../../../shared/pipes/word_normalizer.pipe';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  providers: [WordNormalizer],
})
export class MenuComponent implements OnInit, OnDestroy {
  public menu$: Observable<Dish[]> = of([]);
  public filteredMenu: Dish[] = [];
  public categories$: Observable<string[]> = of([]);
  public choosenCategory: string[] = [];
  public searchForm: FormGroup;
  private subscription!: Subscription;

  constructor(
    private dataService: DataService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private wordNormalizer: WordNormalizer
  ) {
    this.searchForm = this.fb.group({
      childControl: [''],
    });
  }

  ngOnInit(): void {
    this.menu$ = this.dataService.getMenu();

    this.categories$ = this.menu$.pipe(
      map((data: Dish[]) =>
        data.reduce<string[]>((acc, dish) => {
          if (!acc.includes(dish.category)) {
            acc.push(dish.category);
          }
          return acc;
        }, [])
      )
    );

    this.searchForm
      .get('childControl')
      ?.valueChanges.pipe(debounceTime(500))
      .subscribe((dish_name) => {
        this.getFilteredMenu(this.choosenCategory, dish_name);
      });
  }

  public filterByCategory(category: string) {
    if (this.choosenCategory.includes(category)) {
      this.choosenCategory.splice(this.choosenCategory.indexOf(category), 1);
    } else {
      this.choosenCategory.push(category);
    }

    this.getFilteredMenu(
      this.choosenCategory,
      this.searchForm.get('childControl')?.value
    );
  }

  private getFilteredMenu(categories?: string[], dish?: string): void {
    const normalizedDishName = this.wordNormalizer.transform(dish);

    this.subscription = this.subscription = this.dataService
      .getMenu(this.choosenCategory, normalizedDishName)
      .pipe(take(1))
      .subscribe((data) => (this.filteredMenu = data));
  }

  public openDialog(id: string): void {
    const dialogRef = this.dialog.open(ItemWindowComponent, {
      width: '1100px',
      data: { id },
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
