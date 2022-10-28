import {ActionReducerMap} from "@ngrx/store";
import {UserEffects} from "../user/store/user.effects";
import {userReducer} from "../user/store/user.reduser";
import {UserStateFacade} from "../user/store/user.fasad";
import {authReducer} from "../auth/store/auth.reducer";
import {AuthEffects} from "../auth/store/auth.effects";
import {AuthStateFacade} from "../auth/store/auth.facade";
import {AuthorEffects} from "./authors/authors.effects";
import {AuthorsStateFacade} from "./authors/authors.facade";
import {authorReducer} from "./authors/authors.reducer";

interface State {}

export const reducers: ActionReducerMap<State>= [userReducer, authReducer, authorReducer]

export const effects =[UserEffects, AuthEffects, AuthorEffects];

export const facades = [UserStateFacade,AuthStateFacade, AuthorsStateFacade]




