import { createAction, props } from "@ngrx/store";
import { User } from "src/app/core/models/user";

export const getUser = createAction(
  '[REGISTER FORM] get user info',
  props<{token: string}>()
);

export const getUserSuccess = createAction(
  '[EFFECT] got user info',
  props<{user?: User}>()
);

// export const addItemToChart = createAction(
//   '[TO CHART BUTTON] add item to the chart'
// );

// export const addItemToFavorites = createAction(
//   '[TO FAVORITES BUTTON] add item to the favorites'
// );

export const getUserChanges = createAction(
  '[ITEM CONTROL BUTTONS OR ORDER] get all user changes'
)
