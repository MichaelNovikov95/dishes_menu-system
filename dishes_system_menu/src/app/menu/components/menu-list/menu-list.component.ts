import { Component, Input } from '@angular/core';
import { Dish } from '../../../shared/interfaces/menu.interface';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.css',
})
export class MenuListComponent {
  @Input() dish!: Dish;
}
