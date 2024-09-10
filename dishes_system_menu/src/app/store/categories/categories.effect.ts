import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { CategoriesService } from '../../shared/services/categories/categories.service';
import {
  getAllCategories,
  getAllCategoriesFailure,
  getAllCategoriesSuccess,
} from './categories.action';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class CateogiresEffect {
  constructor(
    private cateogiresService: CategoriesService,
    private actions$: Actions
  ) {}

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getAllCategories)
      // switchMap(() =>
      //   this.cateogiresService.getCategories().pipe(
      //     map((categories) => getAllCategoriesSuccess({ categories })),
      //     catchError((error) =>
      //       of(getAllCategoriesFailure({ error: error.message }))
      //     )
      //   )
      // )
    )
  );
}
