import { Action, createReducer, on } from "@ngrx/store";
import { addItemToChart, getUser, getUserSuccess } from "../actions/user-actions";
import { initialUserState, UserState } from "../state.models";

const _reducer= createReducer(initialUserState,
  on(getUser, (state) => ({...state})),
  on(getUserSuccess, (state, {user}) => ({...state, user})),
  on(addItemToChart, (state) => ({...state}))
  );

export function userReducer(state: UserState, action: Action): UserState {
  return _reducer(state, action);
}
