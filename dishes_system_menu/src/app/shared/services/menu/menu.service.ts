import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, map, take, tap } from 'rxjs';

import { Dish } from '../../interfaces/menu.interface';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private apiUrl = import.meta.env.NG_APP_API_URL;
  private dishesSubject = new BehaviorSubject<Dish[]>([]);
  public currentDishes = this.dishesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getAllDishes();
  }

  getAllDishes(categories?: string[], dish?: string): void {
    let params: Params = {};

    if (categories) {
      params['category'] = categories;
    }

    if (dish) {
      params['name_like'] = dish;
    }
    this.http
      .get<Dish[]>(`${this.apiUrl}/api/menu`, { params })
      .pipe(take(1))
      .subscribe((dishes) => {
        this.dishesSubject.next(dishes);
      });
  }

  getDishById(id: string): Observable<Dish> {
    return this.http
      .get<Dish>(`${this.apiUrl}/api/menu/${id}`)
      .pipe(map((dishes) => dishes));
  }

  createDish(newDish: Dish): Observable<Dish> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http
      .post<Dish>(`${this.apiUrl}/api/menu`, newDish, {
        headers: headers,
      })
      .pipe(tap(() => this.getAllDishes()));
  }

  updateDishById(id: string, dish: Dish): Observable<Dish> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');

    return this.http
      .put<Dish>(`${this.apiUrl}/api/menu/${id}`, dish, {
        headers: headers,
      })
      .pipe(tap(() => this.getAllDishes()));
  }

  deleteDishById(id: string): Observable<void> {
    this.getAllDishes();

    return this.http
      .delete<void>(`${this.apiUrl}/api/menu/${id}`)
      .pipe(tap(() => this.getAllDishes()));
  }

  downloadPhoto(photo: FormData) {
    return this.http.post(`${this.apiUrl}/menu`, photo);
  }
}
