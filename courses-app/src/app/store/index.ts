import {UserEffects} from "../user/store/user.effects";
import {UserStateFacade} from "../user/store/user.fasad";
import {AuthEffects} from "../auth/store/auth.effects";
import {AuthStateFacade} from "../auth/store/auth.facade";
import {AuthorEffects} from "./authors/authors.effects";
import {AuthorsStateFacade} from "./authors/authors.facade";
import {CoursesEffects} from "./courses/courses.effects";
import {CoursesStateFacade} from "./courses/courses.facade";

interface State {}

export const effects =[UserEffects, AuthEffects, AuthorEffects, CoursesEffects];

export const facades = [UserStateFacade,AuthStateFacade, AuthorsStateFacade, CoursesStateFacade]




