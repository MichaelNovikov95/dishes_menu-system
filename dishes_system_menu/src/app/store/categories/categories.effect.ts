import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { CategoriesService } from '../../shared/services/categories/categories.service';
import * as CategoriesActions from './categories.action';

@Injectable()
export class CateogiresEffect {
  private loadCategories$: any;

  constructor(
    private cateogiresService: CategoriesService,
    private actions$: Actions
  ) {
    this.loadCategories$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CategoriesActions.getAllCategories),
        switchMap(() =>
          this.cateogiresService.getCategories().pipe(
            map((categories) =>
              CategoriesActions.getAllCategoriesSuccess({ categories })
            ),
            catchError((error) =>
              of(
                CategoriesActions.getAllCategoriesFailure({
                  error: error.message,
                })
              )
            )
          )
        )
      )
    );
  }
}
