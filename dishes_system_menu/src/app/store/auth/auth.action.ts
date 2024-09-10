import { createAction, props } from '@ngrx/store';
import { User } from '../../shared/interfaces/user.interface';

export const Login = createAction(
  '[Login] login',
  props<{ username: string; password: string }>()
);
export const LoginSuccess = createAction(
  '[Login] login success',
  props<{ user: User }>()
);
export const LoginFailure = createAction(
  '[Login] login failure',
  props<{ error: string }>()
);

export const Register = createAction(
  '[Register] register',
  props<{ username: string; password: string }>()
);
export const RegisterSuccess = createAction(
  '[Register] register success',
  props<{ message: string }>()
);
export const RegisterFailure = createAction(
  '[Register] register failure',
  props<{ error: string }>()
);

export const Logout = createAction('[Login] login');
export const LogoutSuccess = createAction('[Logout] logout success');
export const LogoutFailure = createAction(
  '[Logout] logout failure',
  props<{ error: string }>()
);
