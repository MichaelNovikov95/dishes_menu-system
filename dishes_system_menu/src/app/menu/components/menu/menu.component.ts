import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

import { ItemWindowComponent } from '../../dialogs/item-window/item-window.component';
import { DataService } from '../../../shared/services/data.service';
import { Dish } from '../../../shared/interfaces/menu.interface';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit, OnDestroy {
  menu: Dish[] = [];
  filteredMenu: Dish[] = [];
  categories: string[] = [];
  choosenCategory: string | null = null;

  private subscription!: Subscription;

  constructor(private dataService: DataService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.subscription = this.dataService.getMenu().subscribe(
      (data) => {
        this.menu = data;
        this.filteredMenu = this.menu;
        this.categories = Array.from(
          new Set(data.map((item) => item.category))
        );
      },
      (error) => console.log('Fetch error', error)
    );
  }

  filterByCategory(category: string) {
    if (category === this.choosenCategory) {
      this.choosenCategory = null;
      return (this.filteredMenu = this.menu);
    }
    this.choosenCategory = category;

    return (this.filteredMenu = this.menu.filter(
      (dish) => dish.category === this.choosenCategory
    ));
  }

  searchDish(value: string) {
    const displayedFilteredDishes = this.menu.filter(
      (dish) => dish.category === this.choosenCategory
    );

    if (this.choosenCategory === null && value === '') {
      return (this.filteredMenu = this.menu);
    } else if (this.choosenCategory === null && value !== '') {
      return (this.filteredMenu = this.menu.filter((dish) =>
        dish.name.toLowerCase().includes(value.toLowerCase())
      ));
    } else {
      return (this.filteredMenu = displayedFilteredDishes.filter((dish) =>
        dish.name.toLowerCase().includes(value.toLowerCase())
      ));
    }
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(ItemWindowComponent, {
      width: '1100px',
      data: { id },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
