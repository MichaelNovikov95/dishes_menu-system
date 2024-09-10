import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = import.meta.env.NG_APP_API_URL;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<HttpResponse<User>> {
    const params = { username, password };

    return this.http.post<User>(
      `${this.apiUrl}/api/auth/login`,
      { params },
      { observe: 'response', withCredentials: true }
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
  }

  tokenHandler(response: HttpResponse<any>): string | null {
    return response.headers.get('Authorization');
  }

  public isAuthorized(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }
}
