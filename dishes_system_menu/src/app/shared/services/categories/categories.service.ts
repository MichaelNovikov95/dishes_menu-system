import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiUrl = import.meta.env.NG_APP_API_URL;

  constructor(private http: HttpClient) {}

  public getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/api/categories`);
  }
}
