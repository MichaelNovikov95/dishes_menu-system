import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import { AuthService } from '../../auth/service/auth.service';
import * as AuthActions from './auth.action';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private login$: any;
  private register$: any;
  private loginSuccess$: any;
  private registerSuccess$: any;
  private logout$: any;
  private logoutSuccess$: any;

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {
    this.login$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.Login),
        switchMap(({ username, password }) =>
          this.authService.login(username, password).pipe(
            map((response) => {
              const user = response.body;
              const accessToken = this.authService.tokenHandler(response);

              if (accessToken) {
                localStorage.setItem('token', accessToken);
              }

              if (user) {
                return AuthActions.LoginSuccess({ user });
              } else {
                throw Error('User not found');
              }
            }),
            catchError((error) =>
              of(AuthActions.LoginFailure({ error: error.message }))
            )
          )
        )
      )
    );

    this.loginSuccess$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(AuthActions.LoginSuccess),
          tap(() => {
            this.router.navigate(['/']);
          })
        ),
      { dispatch: false }
    );

    this.register$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.Register),
        switchMap(({ username, password }) =>
          this.authService.register(username, password).pipe(
            map(() =>
              AuthActions.RegisterSuccess({ message: 'registration success' })
            ),
            catchError((error) =>
              of(AuthActions.RegisterFailure({ error: error.message }))
            )
          )
        )
      )
    );

    this.registerSuccess$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(AuthActions.RegisterSuccess),
          tap(() => {
            this.router.navigate(['/auth/login']);
          })
        ),
      { dispatch: false }
    );

    this.logout$ = createEffect(() =>
      this.actions$.pipe(
        ofType(AuthActions.Logout),
        map(() => {
          localStorage.removeItem('token');
          return AuthActions.LogoutSuccess();
        })
      )
    );

    this.logoutSuccess$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(AuthActions.LogoutSuccess),
          tap(() => {
            this.router.navigate(['/auth/login']);
          })
        ),
      { dispatch: false }
    );
  }
}
