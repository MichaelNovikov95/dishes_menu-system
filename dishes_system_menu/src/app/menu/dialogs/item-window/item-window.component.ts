import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DataService } from '../../../shared/services/data.service';
import { Dish } from '../../../shared/interfaces/menu.interface';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-item-window',
  templateUrl: './item-window.component.html',
  styleUrl: './item-window.component.css',
})
export class ItemWindowComponent implements OnInit, OnDestroy {
  dish: Dish | undefined;
  id: string | undefined;

  private subscription!: Subscription;

  constructor(
    public dialogRef: MatDialogRef<ItemWindowComponent>,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) {
    this.id = data.id;
  }

  ngOnInit(): void {
    if (this.id) {
      this.subscription = this.dataService
        .getMenu()
        .pipe(take(1))
        .subscribe((data) => {
          this.dish = data.find((dish: Dish) => dish.id === this.id);
        });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
