import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, debounceTime, map, of, take } from 'rxjs';
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
export class MenuComponent implements OnInit {
  public menu$: Observable<Dish[]> = of([]);
  public filteredMenu: Dish[] = [];
  public categories$: Observable<string[]> = of([]);
  public choosenCategory: string[] = [];
  public searchForm: FormGroup;

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
        const normalizedDishName = this.wordNormalizer.transform(dish_name);
        this.dataService
          .filterMenuByName(normalizedDishName, this.choosenCategory)
          .pipe(take(1))
          .subscribe((data) => (this.filteredMenu = data));
      });
  }

  public filterByCategory(category: string) {
    if (this.choosenCategory.includes(category)) {
      this.choosenCategory.splice(this.choosenCategory.indexOf(category), 1);
    } else {
      this.choosenCategory.push(category);
    }

    this.dataService
      .filterMenuByCategory(this.choosenCategory)
      .pipe(take(1))
      .subscribe((data) => (this.filteredMenu = data));
  }

  public openDialog(id: string): void {
    const dialogRef = this.dialog.open(ItemWindowComponent, {
      width: '1100px',
      data: { id },
    });
  }
}
