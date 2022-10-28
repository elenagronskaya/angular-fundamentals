import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {authQuery} from "./auth.selectors";
import {AuthState} from "./auth.reducer";
import {ILoginData, IRegistrationData} from "../../interfaces/auth.interfaces";
import {authActions} from "./auth.actions";
import {SessionStorageService} from "../services/session-storage.service";
import {Actions, ofType} from "@ngrx/effects";

@Injectable()
export class AuthStateFacade  {
  isAuthorized$ = this.store.pipe(select(authQuery.isUserAuthorized));
  getToken$ = this.store.pipe(select(authQuery.getToken));

  getLoginSuccess$ = this.updates$.pipe(ofType(authActions.requestLoginSuccess));


  getLoginErrorMessage$ = this.store.pipe(select(authQuery.getSpecificErrorMessage));
  getRegisterErrorMessage$ = this.store.pipe(select(authQuery.getSpecificErrorMessage));
  getRegisterSuccess$ = this.updates$.pipe(ofType(authActions.requestRegisterSuccess));

  getLogoutSuccess$ = this.updates$.pipe(ofType(authActions.requestLogoutSuccess));

  constructor(private store: Store<AuthState>, private sessionStorage : SessionStorageService, private updates$: Actions,) {
  }

  login = (payload: ILoginData) => this.store.dispatch(authActions.requestLogin(payload))
  register = (payload: IRegistrationData) => this.store.dispatch(authActions.requestRegister(payload))
  closeSession = () => this.store.dispatch(authActions.requestLogout())
  setAuthorization = () => authActions.requestLoginSuccess({ token: this.sessionStorage.getToken() })
}
