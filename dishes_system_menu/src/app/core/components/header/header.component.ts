import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';

import { DishWindowComponent } from '../../../menu/dialogs/dish-window/dish-window.component';
import { AppState } from '../../../store/app.state';
import { Logout } from '../../../store/auth/auth.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  public userRole: string[] | null = null;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(public dialog: MatDialog, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select('auth')
      .pipe(takeUntil(this.destroy$))
      .subscribe((authState) => {
        this.userRole = authState.roles;
      });
  }

  public openDishDialog(id: string | null): void {
    this.dialog.open(DishWindowComponent, {
      width: '1000px',
      data: { id: null },
    });
  }

  public Logout(): void {
    this.store.dispatch(Logout());
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
