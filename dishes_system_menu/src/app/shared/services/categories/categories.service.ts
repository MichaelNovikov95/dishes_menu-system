import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  public categories: string[] = [
    'Cold starters',
    'Warm Starters',
    'Sashimi',
    'Hosomaki',
    'Traditionall Rolls',
    'Hot Dishes',
  ];
  constructor() {}
}
