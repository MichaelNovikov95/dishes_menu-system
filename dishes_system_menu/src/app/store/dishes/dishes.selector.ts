import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DishesState } from './dishes.reducer';

export const selectDishesFeature = createFeatureSelector<DishesState>('dishes');

export const selectDishes = createSelector(
  selectDishesFeature,
  (state: DishesState) => state.dishes
);

export const selectDish = createSelector(
  selectDishesFeature,
  (state: DishesState) => state.selectedDish
);
