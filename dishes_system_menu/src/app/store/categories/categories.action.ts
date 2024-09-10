import { createAction, props } from '@ngrx/store';

export const getAllCategories = createAction('[Categories] get all');
export const getAllCategoriesSuccess = createAction(
  '[Categories] get all success',
  props<{ categories: string[] }>()
);
export const getAllCategoriesFailure = createAction(
  '[Categories] get all failure',
  props<{ error: string }>()
);
