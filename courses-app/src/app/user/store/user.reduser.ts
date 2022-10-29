import {createReducer, on} from "@ngrx/store";
import { userActions} from "./user.actions";

export interface UserState {
  isAdmin: boolean;
  name: string | null;
}
export const userFeatureKey = 'currentUser';

export const initialState: UserState = {
  isAdmin: false,
  name: null,
};

export const userReducer  = createReducer(
  initialState,
  on(userActions.requestCurrentUserSuccess, (state, { name, role }) => {
    return ({
    ...state,
      name,
      isAdmin: role === 'admin'
  });}
  ),

  on(userActions.requestCleanUserDataSuccess, (state) => {
  return ({
    ...state,
    isAuthorized: false,
    token: null,
    name: null,
    isAdmin:false
  })}
),
);

