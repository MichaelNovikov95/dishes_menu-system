import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.action';
import { User } from '../../shared/interfaces/user.interface';

export interface AuthState {
  user: User | null;
  message: string;
  error: string;
}

export const initialState: AuthState = {
  user: null,
  message: '',
  error: '',
};

export const AuthReducer = createReducer(
  initialState,

  on(AuthActions.Login, (state) => ({ ...state })),
  on(AuthActions.LoginSuccess, (state, { user }) => ({ ...state, user })),
  on(AuthActions.LoginFailure, (state, { error }) => ({ ...state, error })),

  on(AuthActions.Register, (state) => ({ ...state })),
  on(AuthActions.RegisterSuccess, (state, { message }) => ({
    ...state,
    message,
  })),
  on(AuthActions.RegisterFailure, (state, { error }) => ({ ...state, error })),

  on(AuthActions.LogoutSuccess, (state) => ({ ...state, user: null }))
);
