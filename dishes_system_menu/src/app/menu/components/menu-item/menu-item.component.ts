import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { Dish } from '../../../shared/interfaces/menu.interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css',
})
export class MenuItemComponent implements OnInit {
  dish!: Dish | undefined;
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const dishId = this.route.snapshot.paramMap.get('id');

    if (dishId) {
      this.dataService.getMenu().subscribe((data) => {
        this.dish = data.find((dish: Dish) => dish.id === dishId);
      }).unsubscribe;
    }
  }

  goBack() {
    this.location.back();
  }
}
