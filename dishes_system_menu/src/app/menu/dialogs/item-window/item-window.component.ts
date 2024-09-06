import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';

import { MenuService } from '../../../shared/services/menu/menu.service';
import { Dish } from '../../../shared/interfaces/menu.interface';
import { DishWindowComponent } from '../dish-window/dish-window.component';
import { AuthService } from '../../../auth/service/auth.service';

@Component({
  selector: 'app-item-window',
  templateUrl: './item-window.component.html',
  styleUrl: './item-window.component.css',
})
export class ItemWindowComponent implements OnInit {
  dish: Dish | undefined;
  id: string | undefined;
  public userRoles: string[] | undefined = undefined;

  constructor(
    public dialogRef: MatDialogRef<ItemWindowComponent>,
    private menuService: MenuService,
    private authService: AuthService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) {
    this.id = data.id;
    this.authService.currentUser.subscribe((v) => (this.userRoles = v?.roles));
  }

  ngOnInit(): void {
    if (this.id) {
      this.menuService
        .getDishById(this.id)
        .pipe(take(1))
        .subscribe((dish) => (this.dish = dish));
    }
  }

  public updateDish(id: string) {
    this.openDishDialog(id);
  }

  public deleteDish(id: string) {
    this.menuService
      .deleteDishById(id)
      .pipe(take(1))
      .subscribe({
        next: () => {
          console.log('Dish deleted successfully');
        },
        error: (err) => {
          console.error('Error deleting dish:', err);
        },
      });
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
}
