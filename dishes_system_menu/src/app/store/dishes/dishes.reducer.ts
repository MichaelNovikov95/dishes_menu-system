import { createReducer, on } from '@ngrx/store';
import * as DishesAction from './dishes.action';
import { Dish } from '../../shared/interfaces/menu.interface';

export interface DishesState {
  id: string;
  dishes: Dish[];
  selectedDish: Dish | null;
  error: string;
}

export const initialState: DishesState = {
  id: '',
  dishes: [],
  selectedDish: null,
  error: '',
};

export const DishesReducer = createReducer(
  initialState,

  //Get all dishes
  on(DishesAction.getAllDishes, (state) => ({ ...state })),
  on(DishesAction.getAllDishesSuccess, (state, { dishes }) => ({
    ...state,
    dishes,
    error: '',
  })),
  on(DishesAction.getAllDishesFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //Get one dish by id
  on(DishesAction.getDishById, (state) => ({ ...state })),
  on(DishesAction.getDishByIdSuccess, (state, { dish }) => ({
    ...state,
    selectedDish: dish,
    error: '',
  })),
  on(DishesAction.getDishByIdFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //Create a new dish
  on(DishesAction.createDish, (state) => ({ ...state })),
  on(DishesAction.createDishSuccess, (state, { dish }) => ({
    ...state,
    dishes: [...state.dishes, dish],
    error: '',
  })),
  on(DishesAction.createDishFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //Update one dish by id
  on(DishesAction.updateDishById, (state) => ({ ...state })),
  on(DishesAction.updateDishByIdSuccess, (state, { dish }) => ({
    ...state,
    dishes: state.dishes.map((d) => (d.id === dish.id ? { ...dish } : d)),
    error: '',
  })),
  on(DishesAction.updateDishByIdFailure, (state, { error }) => ({
    ...state,
    error,
  })),

  //Delete one dish by id
  on(DishesAction.deleteDishById, (state) => ({ ...state })),
  on(DishesAction.deleteDishByIdSuccess, (state, { id }) => ({
    ...state,
    dishes: state.dishes.filter((d) => d.id !== id),
    error: '',
  })),
  on(DishesAction.deleteDishByIdFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
