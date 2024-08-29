import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemWindowComponent } from '../../dialogs/item-window/item-window.component';

import { DataService } from '../../../services/data.service';

import { Dish } from '../../../shared/interfaces/menu.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  menu: Dish[] = [];
  filteredMenu: Dish[] = [];
  categories: string[] = [];
  choosenCategory: string | null = null;

  constructor(
    private dataService: DataService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.dataService.getMenu().subscribe(
      (data) => {
        this.menu = data;
        this.filteredMenu = this.menu;
        this.categories = Array.from(
          new Set(data.map((item) => item.category))
        );
      },
      (error) => console.log('Fetch error', error)
    ).unsubscribe;
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

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(ItemWindowComponent, {
      width: '1100px',
      data: { id },
    });
  }
}
