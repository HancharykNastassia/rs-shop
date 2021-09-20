import { createAction, props } from "@ngrx/store";
import { User } from "src/app/core/models/user";

export const getUser = createAction(
  '[REGISTER FORM] get user info',
  props<{token: string}>()
);

export const getUserSuccess = createAction(
  '[EFFECT] got user info',
  props<{user?: User}>()
)
