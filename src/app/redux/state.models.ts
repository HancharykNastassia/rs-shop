import { CategoryModel } from '../core/models/category-models';
import { User } from '../core/models/user';

export interface AppState {
  categories: CategoriesState;
  user: UserState;
}

export interface UserState {
  user?: User;
}

export interface CategoriesState {
  categories: CategoryModel[];
}

export const initialUserState: UserState = {
  user: undefined,
};

export const initialCategoriesState: CategoriesState = {
  categories: [],
};
