import { ActionReducer, ActionReducerMap } from "@ngrx/store";
import { AppState, CategoriesState } from "../state.models";
import { categoriesReducer } from "./categories-reducers";

export const reducer: ActionReducerMap<AppState> = {
  categories: <ActionReducer<CategoriesState>> categoriesReducer,
}
