import { Action, ActionReducer } from '@ngrx/store';

import {
  CategoriesReducer,
  CategoriesState,
} from './categories/categories.reducer';
import { CateogiresEffect } from './categories/categories.effect';

import { DishesReducer, DishesState } from './dishes/dishes.reducer';
import { DishesEffects } from './dishes/dishes.effect';

import { AuthReducer, AuthState } from './auth/auth.reducer';
import { AuthEffects } from './auth/auth.effect';

export interface AppState {
  categories: CategoriesState;
  dishes: DishesState;
  auth: AuthState;
}

export interface AppStore {
  categories: ActionReducer<CategoriesState, Action>;
  dishes: ActionReducer<DishesState, Action>;
  auth: ActionReducer<AuthState, Action>;
}

export const appStore: AppStore = {
  categories: CategoriesReducer,
  dishes: DishesReducer,
  auth: AuthReducer,
};

export const appEffects = [CateogiresEffect, DishesEffects, AuthEffects];
