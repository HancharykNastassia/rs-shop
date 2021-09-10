import { CategoryModel } from "../core/models/category-models";

export interface AppState{
  categories: CategoriesState;
}

export interface CategoriesState {
  categories: CategoryModel[];
}

export const initialCategoriesState: CategoriesState = {
  categories: [],
}
