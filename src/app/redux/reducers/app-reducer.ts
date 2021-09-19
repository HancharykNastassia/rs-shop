import { ActionReducer, ActionReducerMap } from "@ngrx/store";
import { AppState, CategoriesState, UserState } from "../state.models";
import { categoriesReducer } from "./categories-reducers";
import { userReducer } from "./user-reducers";

export const reducer: ActionReducerMap<AppState> = {
  categories: <ActionReducer<CategoriesState>> categoriesReducer,
  user:<ActionReducer<UserState>> userReducer,
}
