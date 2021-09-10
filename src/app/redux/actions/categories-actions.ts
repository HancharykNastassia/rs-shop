import { createAction, props } from "@ngrx/store";
import { CategoryModel } from "src/app/core/models/category-models";

export const getCategories = createAction(
  '[GOODS SERVICE] get goods categories',
  props<{data: CategoryModel[]}>()
)

export const getCategoriesSuccess = createAction (
  '[EFFECT] got goods cateegories successfull'
)
