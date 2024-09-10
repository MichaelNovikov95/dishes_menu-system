import { createReducer, on } from '@ngrx/store';
import * as CategoriesActions from './categories.action';

export interface CategoriesState {
  categories: string[];
  error: string;
}

export const initialState: CategoriesState = {
  categories: [],
  error: '',
};

export const CategoriesReducer = createReducer(
  initialState,

  on(CategoriesActions.getAllCategories, (state) => ({ ...state })),
  on(CategoriesActions.getAllCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories,
  })),
  on(CategoriesActions.getAllCategoriesFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
