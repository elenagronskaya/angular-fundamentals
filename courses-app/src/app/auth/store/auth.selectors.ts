import {createFeatureSelector, createSelector} from "@ngrx/store";
import {authFeatureKey, AuthState} from "./auth.reducer";


const getAuthorizedState = createFeatureSelector<AuthState>(authFeatureKey);

export const isUserAuthorized = createSelector(
  getAuthorizedState,
  (state: AuthState) => state.isAuthorized
);

export const getToken = createSelector(
  getAuthorizedState,
  (state: AuthState) => state.token
);

export const getSpecificErrorMessage  = createSelector(
  getAuthorizedState,
  (state: AuthState) => state.errorMessage
);

export const authQuery = {
  isUserAuthorized,
  getToken,
  getSpecificErrorMessage
}
