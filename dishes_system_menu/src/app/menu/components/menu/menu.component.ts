import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription, debounceTime, of, take } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

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
  public categories: string[] = [
    'Cold starters',
    'Warm Starters',
    'Sashimi',
    'Hosomaki',
    'Traditionall Rolls',
    'Hot Dishes',
  ];
  public choosenCategory: string[] = [];
  public searcher = new FormControl('', [Validators.minLength(3)]);
  private subscription!: Subscription;

  constructor(
    private dataService: DataService,
    public dialog: MatDialog,
    private wordNormalizer: WordNormalizer
  ) {}

  ngOnInit(): void {
    this.menu$ = this.dataService.getMenu();

    this.subscription = this.searcher.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => {
        if (this.searcher.valid || !this.searcher.value?.length) {
          this.getFilteredMenu();
        }
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

    this.subscription = this.dataService
      .getMenu(this.choosenCategory, normalizedDishName)
      .pipe(take(1))
      .subscribe((data) => {
        this.filteredMenu = data;
      });
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
