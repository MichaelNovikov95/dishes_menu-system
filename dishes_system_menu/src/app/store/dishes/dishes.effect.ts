import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import * as DishesAction from './dishes.action';
import { MenuService } from '../../shared/services/menu/menu.service';

@Injectable()
export class DishesEffects {
  private getAllDishes$: any;
  private getDishById$: any;
  private createDish$: any;
  private updateDishById$: any;
  private deleteDishById$: any;

  constructor(private actions$: Actions, private menuService: MenuService) {
    this.getAllDishes$ = createEffect(() =>
      this.actions$.pipe(
        ofType(DishesAction.getAllDishes),
        switchMap(({ categories, dish }) =>
          this.menuService.getAllDishes(categories, dish).pipe(
            map((dishes) => DishesAction.getAllDishesSuccess({ dishes })),
            catchError((error) =>
              of(DishesAction.getAllDishesFailure({ error: error.message }))
            )
          )
        )
      )
    );

    this.getDishById$ = createEffect(() =>
      this.actions$.pipe(
        ofType(DishesAction.getDishById),
        switchMap(({ id }) =>
          this.menuService.getDishById(id).pipe(
            map((dish) => DishesAction.getDishByIdSuccess({ dish })),
            catchError((error) =>
              of(DishesAction.getDishByIdFailure({ error: error.message }))
            )
          )
        )
      )
    );

    this.createDish$ = createEffect(() =>
      this.actions$.pipe(
        ofType(DishesAction.createDish),
        switchMap(({ newDish }) =>
          this.menuService.createDish(newDish).pipe(
            map((dish) => DishesAction.createDishSuccess({ dish })),
            catchError((error) =>
              of(DishesAction.createDishFailure({ error: error.message }))
            )
          )
        )
      )
    );

    this.updateDishById$ = createEffect(() =>
      this.actions$.pipe(
        ofType(DishesAction.updateDishById),
        switchMap(({ id, dish }) =>
          this.menuService.updateDishById(id, dish).pipe(
            map((dish) => DishesAction.updateDishByIdSuccess({ dish })),
            catchError((error) =>
              of(DishesAction.updateDishByIdFailure({ error: error.message }))
            )
          )
        )
      )
    );

    this.deleteDishById$ = createEffect(() =>
      this.actions$.pipe(
        ofType(DishesAction.deleteDishById),
        switchMap(({ id }) =>
          this.menuService.deleteDishById(id).pipe(
            map(() => DishesAction.deleteDishByIdSuccess({ id })),
            catchError((error) =>
              of(DishesAction.deleteDishByIdFailure({ error: error.message }))
            )
          )
        )
      )
    );
  }
}
