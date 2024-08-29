import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Dish } from '../interfaces/menu.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getMenu(): Observable<Dish[]> {
    return this.http.get<Dish[]>(`${this.apiUrl}/menu`);
  }
}
