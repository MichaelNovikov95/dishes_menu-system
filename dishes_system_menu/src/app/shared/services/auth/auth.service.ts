import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { tap } from 'rxjs';
import { User } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = import.meta.env.NG_APP_API_URL;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  public login(username: string, password: string): Observable<boolean> {
    const params = { username, password };
    return this.http.get<User[]>(`${this.apiUrl}/users`, { params }).pipe(
      map((users) => users[0]),
      tap((user) => {
        if (user) {
          user.roles = user.username === 'Admin' ? ['admin', 'user'] : ['user'];
          this.currentUserSubject.next(user);
        }
      }),
      map((user) => !!user)
    );
  }

  register(username: string, password: string): Observable<void> {
    const newUser = { username, password, roles: ['user'] };
    return this.http
      .post<void>(`${this.apiUrl}/users`, newUser)
      .pipe(tap(() => this.currentUserSubject.next(newUser)));
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public isAuthorized(): boolean {
    const user = this.currentUserValue;
    if (!user) return false;
    return true;
  }
}
