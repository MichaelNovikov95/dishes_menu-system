import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, debounceTime, filter, takeUntil } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { ItemWindowComponent } from '../../dialogs/item-window/item-window.component';
import { Dish } from '../../../shared/interfaces/menu.interface';
import { AppState } from '../../../store/app.state';
import { getAllDishes } from '../../../store/dishes/dishes.action';
import { selectDishes } from '../../../store/dishes/dishes.selector';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit, OnDestroy {
  public menu$!: Observable<Dish[]>;
  public choosenCategory: string[] = [];
  public searcher = new FormControl('', [Validators.minLength(3)]);

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(getAllDishes({ categories: [], dish: '' }));
    this.menu$ = this.store.select(selectDishes);

    this.searcher.valueChanges
      .pipe(
        debounceTime(500),
        filter(() => this.searcher.valid),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.store.dispatch(
          getAllDishes({
            categories: this.choosenCategory,
            dish: this.searcher.value!,
          })
        );
      });
  }

  public filterByCategory(categories: string[]): void {
    this.choosenCategory = categories;
    this.store.dispatch(
      getAllDishes({
        categories: this.choosenCategory,
        dish: this.searcher.value!,
      })
    );
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
