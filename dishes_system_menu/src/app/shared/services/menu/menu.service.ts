import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Dish } from '../../interfaces/menu.interface';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private apiUrl = import.meta.env.NG_APP_API_URL;

  constructor(private http: HttpClient) {}

  public getAllDishes(
    categories?: string[],
    dish?: string
  ): Observable<Dish[]> {
    let params: Params = {};

    if (categories) {
      params['category'] = categories;
    }

    if (dish) {
      params['name_like'] = dish;
    }
    return this.http.get<Dish[]>(`${this.apiUrl}/api/menu`, { params });
  }

  public getDishById(id: string): Observable<Dish> {
    return this.http.get<Dish>(`${this.apiUrl}/api/menu/${id}`);
  }

  public createDish(newDish: Dish): Observable<Dish> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.post<Dish>(`${this.apiUrl}/api/menu`, newDish, {
      headers: headers,
    });
  }

  public updateDishById(id: string, dish: Dish): Observable<Dish> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http.put<Dish>(`${this.apiUrl}/api/menu/${id}`, dish, {
      headers: headers,
    });
  }

  public deleteDishById(id: string): Observable<void> {
    this.getAllDishes();

    return this.http.delete<void>(`${this.apiUrl}/api/menu/${id}`);
  }
}
