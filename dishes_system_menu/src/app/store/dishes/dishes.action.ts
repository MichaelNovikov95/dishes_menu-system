import { createAction, props } from '@ngrx/store';
import { Dish } from '../../shared/interfaces/menu.interface';

//Get all dishes
export const getAllDishes = createAction(
  '[Dish] get all dishes',
  props<{ categories?: string[]; dish?: string }>()
);
export const getAllDishesSuccess = createAction(
  '[Dish] get all dishes success',
  props<{ dishes: Dish[] }>()
);
export const getAllDishesFailure = createAction(
  '[Dish] get all dishes failure',
  props<{ error: string }>()
);

//Get dish by id
export const getDishById = createAction(
  '[Dish] get dish by id',
  props<{ id: string }>()
);
export const getDishByIdSuccess = createAction(
  '[Dish] get dish by id success',
  props<{ dish: Dish }>()
);
export const getDishByIdFailure = createAction(
  '[Dish] get dish by id failure',
  props<{ error: string }>()
);

//Post new Dish
export const createDish = createAction(
  '[Dish] create dish',
  props<{ newDish: Dish }>()
);
export const createDishSuccess = createAction(
  '[Dish] create dish success',
  props<{ dish: Dish }>()
);
export const createDishFailure = createAction(
  '[Dish] create dish failure',
  props<{ error: string }>()
);

//Update Dish by id
export const updateDishById = createAction(
  '[Dish] update dish by id',
  props<{ id: string; dish: Dish }>()
);
export const updateDishByIdSuccess = createAction(
  '[Dish] update dish by id success',
  props<{ dish: Dish }>()
);
export const updateDishByIdFailure = createAction(
  '[Dish] update dish by id failure',
  props<{ error: string }>()
);

//Delete Dish by id
export const deleteDishById = createAction(
  '[Dish] delete dish by id',
  props<{ id: string }>()
);
export const deleteDishByIdSuccess = createAction(
  '[Dish] delete dish by id success',
  props<{ id: string }>()
);
export const deleteDishByIdFailure = createAction(
  '[Dish] delete dish by id failure',
  props<{ error: string }>()
);
