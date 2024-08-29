import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DataService } from '../../../services/data.service';
import { Dish } from '../../../shared/interfaces/menu.interface';

@Component({
  selector: 'app-item-window',
  templateUrl: './item-window.component.html',
  styleUrl: './item-window.component.css',
})
export class ItemWindowComponent implements OnInit {
  dish: Dish | undefined;
  id: string | undefined;

  constructor(
    public dialogRef: MatDialogRef<ItemWindowComponent>,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) {
    this.id = data.id;
  }

  ngOnInit(): void {
    if (this.id) {
      this.dataService.getMenu().subscribe((data) => {
        this.dish = data.find((dish: Dish) => dish.id === this.id);
      }).unsubscribe;
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
