import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Dish } from '../interfaces/menu.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = import.meta.env.NG_APP_API_URL;

  constructor(private http: HttpClient) {}

  getMenu(): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${this.apiUrl}/menu`);
  }

  filterMenuByCategory(categories: string[]): Observable<Dish[]> {
    let params = { category: categories };

    return this.http.get<Dish[]>(`${this.apiUrl}/menu`, { params });
  }

  filterMenuByName(dish: string, categories?: string[]): Observable<Dish[]> {
    let params: any = { name: dish };

    if (categories) {
      params.category = categories;
    }

    return this.http.get<Dish[]>(`${this.apiUrl}/menu`, { params });
  }
}
