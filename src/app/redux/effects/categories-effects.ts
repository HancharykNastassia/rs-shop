import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { GoodsService } from 'src/app/core/services/goods.service';
import {
  getCategories,
  getCategoriesSuccess,
} from '../actions/categories-actions';

@Injectable()
export class CategoriesEffects {
  getCategories = createEffect(() =>
    this.actions.pipe(
      ofType(getCategories),
      switchMap(() =>
        this.dataService
          .getCategoriesList()
          .pipe(map((data) => getCategoriesSuccess({ data })))
      )
    )
  );

  constructor(private actions: Actions, private dataService: GoodsService) {}
}
