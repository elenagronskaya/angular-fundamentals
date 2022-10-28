import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {requestCurrentUser, requestCurrentUserFail, requestCurrentUserSuccess} from "./user.actions";
import {UserService} from "../user.service";
import {map, mergeMap, of} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable()
export class UserEffects {
  getCurrentUser$  = createEffect(() => {
      return this.actions$.pipe(
        ofType(requestCurrentUser),
        mergeMap(() => this.userService.getUser()
          .pipe(
            map(userResponse => (requestCurrentUserSuccess(userResponse.result))),
            catchError(() => of(requestCurrentUserFail()))
          )
        )
      );
    }
  );

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}
