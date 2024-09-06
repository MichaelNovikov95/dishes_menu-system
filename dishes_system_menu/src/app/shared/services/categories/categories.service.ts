import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private apiUrl = import.meta.env.NG_APP_API_URL;
  private categoriesSubject = new BehaviorSubject<string[]>([]);
  public currentCategories = this.categoriesSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getCategories();
  }

  getCategories(): void {
    this.http
      .get<string[]>(`${this.apiUrl}/api/categories`)
      .pipe(take(1))
      .subscribe((categories) => {
        this.categoriesSubject.next(categories);
      });
  }
}
