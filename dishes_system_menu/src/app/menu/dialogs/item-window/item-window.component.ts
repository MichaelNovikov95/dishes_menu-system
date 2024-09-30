import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';

import { Dish } from '../../../shared/interfaces/menu.interface';
import { DishWindowComponent } from '../dish-window/dish-window.component';
import { AppState } from '../../../store/app.state';
import {
  deleteDishById,
  getDishById,
} from '../../../store/dishes/dishes.action';
import { selectDish } from '../../../store/dishes/dishes.selector';

@Component({
  selector: 'app-item-window',
  templateUrl: './item-window.component.html',
  styleUrl: './item-window.component.css',
})
export class ItemWindowComponent implements OnInit, OnDestroy {
  public userRole: string[] | null = null;
  public dish$!: Observable<Dish | null>;
  public id: string;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public dialogRef: MatDialogRef<ItemWindowComponent>,
    private store: Store<AppState>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) {
    this.id = data.id;
  }

  ngOnInit(): void {
    this.store
      .select('auth')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authState) => {
        this.userRole = authState.roles;
      });

    this.store.dispatch(getDishById({ id: this.id }));
    this.dish$ = this.store.select(selectDish);
  }

  public updateDish(id: string) {
    this.openDishDialog(id);
  }

  public deleteDish(id: string) {
    this.store.dispatch(deleteDishById({ id: id }));
    this.itemWindowClose();
  }

  public itemWindowClose(): void {
    this.dialogRef.close();
  }

  private openDishDialog(id?: string) {
    this.dialog.open(DishWindowComponent, {
      width: '1000px',
      data: { id },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
