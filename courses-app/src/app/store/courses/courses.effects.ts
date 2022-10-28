import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";


import {CourseService} from "../../services/course.service";
import {authorActions} from "../authors/authors.actions";
import {map, mergeMap, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {coursesActions} from "./courses.actions";
import {AuthorsStateFacade} from "../authors/authors.facade";

@Injectable()
export class CoursesEffects {

  getAuthors$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(coursesActions.requestAllCourses),
        mergeMap(() => this.courseService.getAll()
          .pipe(
            map(response => {
              return coursesActions.requestAllCoursesSuccess({courses: response});
            }),
            catchError(() => of(coursesActions.requestAllCoursesFail({errorMessage: 'requestAllCourses failed'})))
          )

        )
      );
    }
  )

  constructor(private actions$: Actions,
              private courseService: CourseService, private authorsStateFacade : AuthorsStateFacade) {
  }
}
