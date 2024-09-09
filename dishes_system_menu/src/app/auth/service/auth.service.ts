import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, tap } from 'rxjs';
import { User } from '../../shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = import.meta.env.NG_APP_API_URL;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<HttpResponse<User>> {
    const params = { username, password };

    return this.http
      .post<User>(
        `${this.apiUrl}/api/auth/login`,
        { params },
        { observe: 'response', withCredentials: true }
      )
      .pipe(
        tap((user) => {
          this.currentUserSubject.next(user.body);
        })
      );
  }

  register(username: string, password: string): Observable<void> {
    const newUser = { username, password, roles: ['user'] };
    return this.http.post<void>(
      `${this.apiUrl}/api/auth/registration`,
      newUser
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  tokenHandler(response: HttpResponse<any>): void {
    const accessToken = response.headers.get('Authorization');

    if (accessToken) {
      localStorage.setItem('token', accessToken);
    } else {
      throwError(accessToken);
    }
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
