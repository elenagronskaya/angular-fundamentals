import { userQuery} from "./user.selectors";
import {Injectable} from "@angular/core";
import {select, Store} from '@ngrx/store';
import {UserState} from "./user.reduser";
import {userActions} from "./user.actions";

@Injectable()
export class UserStateFacade {

  name$ = this.store.pipe(select(userQuery.getName));
  isAdmin$ = this.store.pipe(select(userQuery.isAdmin));

  constructor(private store: Store<UserState>) {}

  getCurrentUser(): void  {
    this.store.dispatch(userActions.requestCurrentUser());
  }

  cleanUserData = ()=>this.store.dispatch(userActions.requestCleanUserDataSuccess());

}
