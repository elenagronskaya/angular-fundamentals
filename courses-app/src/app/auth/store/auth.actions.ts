import {createAction, props} from "@ngrx/store";
import {ILoginData, IRegistrationData} from "../../interfaces/auth.interfaces";

export const requestLogin = createAction('login', props<ILoginData>());
export const requestLoginSuccess = createAction('loginSuccess', props<{token : string | null}>());
export const requestLoginFail = createAction('login', props<{errorMessage: string}>());

export const requestRegister = createAction("dsf", props<IRegistrationData>());
export const requestRegisterSuccess = createAction("registrationSuccess");
export const requestRegisterFail = createAction('registration', props<{errorMessage: string}>());
export const requestCleanUserDataSuccess = createAction('cleanUserData');

export const requestLogout = createAction('logout');
export const requestLogoutSuccess = createAction('logoutSuccess');


export const authActions = {
  requestLogin,
  requestLoginSuccess,
  requestLoginFail,

  requestRegister,
  requestRegisterSuccess,
  requestRegisterFail,

  requestLogout,
  requestLogoutSuccess,

}
