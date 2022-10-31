import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, mergeMap, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {authActions} from "./auth.actions";
import {AuthService} from "../services/auth.service";
import {SessionStorageService} from "../services/session-storage.service";

@Injectable()
export class AuthEffects {
  login$  = createEffect(() => {
      return this.actions$.pipe(
        ofType(authActions.requestLogin),
        mergeMap((loginData) => this.authService.login(loginData)
          .pipe(
            map(loginResponse =>{
              this.sessionStorageService.setToken(loginResponse.result);
              return authActions.requestLoginSuccess({token: loginResponse.result});})     ,
            catchError(() => of(authActions.requestLoginFail({errorMessage : 'login error'})))
          )
        )
      );
    }
  );

  register$  = createEffect(() => {
      return this.actions$.pipe(
        ofType(authActions.requestRegister),
        mergeMap((registerData) => this.authService.register(registerData)
          .pipe(
            map(() =>{
              return authActions.requestRegisterSuccess();})     ,
            catchError(() => of(authActions.requestRegisterFail({errorMessage : 'register error'})))
          )
        )
      );
    }
  );

  logout$  = createEffect(() => {
      return this.actions$.pipe(
        ofType(authActions.requestLogout),
        mergeMap(() => this.authService.logout()
          .pipe(
            map(registerDataResponse =>{

              this.sessionStorageService.deleteToken();
              return authActions.requestLogoutSuccess();})
          )
        )
      );
    }
  );


  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private sessionStorageService: SessionStorageService
  ) {}
}
