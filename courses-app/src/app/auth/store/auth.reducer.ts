import {createReducer, on} from "@ngrx/store";
import {
  authActions,
  requestLoginSuccess,
  requestLogoutSuccess,
  requestRegisterFail,
} from "./auth.actions";

export interface AuthState {
  isAuthorized: boolean;
  token: string | null;
  errorMessage: string | null;
}

export const authFeatureKey = 'auth';

export const initialState: AuthState = {
  isAuthorized: false,
  token: '',
  errorMessage: ''
};

export const authReducer = createReducer(
  initialState,
  on(requestLoginSuccess, (state, { token  }) => {
    return ({
      ...state,
        isAuthorized: true,
        token,
        errorMessage: null,
    })}
  ),

  on(authActions.requestLogin, (state) => {
    return ({
      ...state,

        isAuthorized: false,
        token: null,
        errorMessage: null,

    })}
  ),

  on(authActions.requestLoginFail, (state, { errorMessage   }) => {
    return ({
      ...state,

        isAuthorized: false,
        token: null,
        errorMessage
    })}
  ),

  on(requestRegisterFail, (state, { errorMessage   }) => {
    return ({
      ...state,
        errorMessage
    })}
  ),

  on(requestLogoutSuccess, (state) => {
    return ({
      ...state,
        isAuthorized: false,
        token: null,
    })}
  ),
)

