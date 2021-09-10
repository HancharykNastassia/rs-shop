import { Action, createReducer, on } from "@ngrx/store";
import { getCategories, getCategoriesSuccess } from "../actions/categories-actions";
import { CategoriesState, initialCategoriesState } from "../state.models";

const _reducer = createReducer(initialCategoriesState,
  on(getCategories, (state) => ({...state})),
  on(getCategoriesSuccess, (state, {data}) => ({...state, categories: data}))
  );

export function categoriesReducer(state: CategoriesState, action: Action): CategoriesState {
  return _reducer(state, action);
}
