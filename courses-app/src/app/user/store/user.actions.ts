import {createAction, props} from "@ngrx/store";
import {IUser} from "../../interfaces/auth.interfaces";
import {requestCleanUserDataSuccess} from "../../auth/store/auth.actions";

export const requestCurrentUser = createAction('Get Current Logged in User');

export const requestCurrentUserSuccess = createAction(
  '[Login Page] Set Current Logged in User',
  props<IUser>()
);

export const requestCurrentUserFail = createAction('Get Current Logged in User');

export const userActions = {
  requestCurrentUser,
  requestCurrentUserSuccess,

  requestCleanUserDataSuccess
}
