import { Action, createReducer, on } from "@ngrx/store";
import { getCategories, getCategoriesSuccess } from "../actions/categories-actions";
import { CategoriesState, initialCategoriesState } from "../state.models";

const _reducer = createReducer(initialCategoriesState,
  on(getCategories, (state, {data}) => ({...state, categories: data})),
  on(getCategoriesSuccess, (state) => ({...state}))
  );

export function categoriesReducer(state: CategoriesState, action: Action): CategoriesState {
  return _reducer(state, action);
}
