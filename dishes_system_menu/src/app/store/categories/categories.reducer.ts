import { createReducer, on } from '@ngrx/store';
import {
  getAllCategories,
  getAllCategoriesFailure,
  getAllCategoriesSuccess,
} from './categories.action';

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

  on(getAllCategories, (state) => ({ ...state })),
  on(getAllCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories,
  })),
  on(getAllCategoriesFailure, (state, { error }) => ({ ...state, error }))
);
