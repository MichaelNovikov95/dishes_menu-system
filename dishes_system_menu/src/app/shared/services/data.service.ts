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

  getMenu(dish?: string, categories?: string[]): Observable<Dish[]> {
    let params: any = {};

    if (categories) {
      params.category = categories;
    }

    if (dish) {
      params.name = dish;
    }
    return this.http.get<Dish[]>(`${this.apiUrl}/menu`, { params });
  }
}
