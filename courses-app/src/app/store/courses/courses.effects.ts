import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";


import {CourseService} from "../../services/course.service";
import {map, mergeMap, of, tap} from "rxjs";
import {catchError} from "rxjs/operators";
import {coursesActions} from "./courses.actions";
import {AuthorsStateFacade} from "../authors/authors.facade";
import {AuthorDTO, CourseDataDTO} from "../../interfaces/auth.interfaces";
import {Router} from "@angular/router";
import {CoursesStateFacade} from "./courses.facade";

@Injectable()
export class CoursesEffects {

  constructor(private actions$: Actions,
              private courseService: CourseService, private authorsStateFacade : AuthorsStateFacade,
              private  coursesStateFacade : CoursesStateFacade,
              private router: Router) {
  }

  getAll$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(coursesActions.requestAllCourses),
        mergeMap(() => {
            return this.courseService.getAll()
              .pipe(map(
                (response) => response.map(c=> new CourseDataDTO(

                  //??????????????????????  HOW TO DO MAPPING???????
                    //c.authors.map( (authorId : string) => this.authorsStateFacade.getAuthorMapping(authorId)),
                    c.authors.map( (authorId : string) => new AuthorDTO(authorId, authorId /* temporary */)),
                    c.creationDate,
                    c.description,
                    c.duration,
                    c.id,
                    c.isEdited,
                    c.title)
                )))
              .pipe(map( (data) => {
                  return coursesActions.requestAllCoursesSuccess({courses: data});
                },
                catchError(() => of(coursesActions.requestAllCoursesFail(
                      {errorMessage: 'requestAllCourses failed'})))
              ));
          }
        )
      )
    }
  )

  filteredCourses$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(coursesActions.requestFilteredCourses),
        mergeMap(({searchValue}) => {
            return this.coursesStateFacade.allCourses$
              .pipe(map(
                (allcourses) => allcourses.filter(
                  c=>c.title.toLowerCase().includes(searchValue.toLowerCase())
                || c.description.toLowerCase().includes(searchValue.toLowerCase())
                )
              ))
              .pipe(map( (filteredCourses) => {
                  return coursesActions.requestFilteredCoursesSuccess({courses: filteredCourses});
                }))
          }
        )
      );
    }
  )

  getSpecificCourse$  = createEffect(() => {
      return this.actions$.pipe(
        ofType(coursesActions.requestSingleCourse),
        mergeMap(({id}) => {
            return this.courseService.getById(id)
              .pipe(map(
                (c) => new CourseDataDTO(
                  //??????????????????????  HOW TO DO MAPPING???????
                  //c.authors.map( (authorId : string) => this.authorsStateFacade.getAuthorMapping(authorId)),
                  c.authors.map( (authorId : string) => new AuthorDTO(authorId, authorId /* temporary */)),
                  c.creationDate,
                  c.description,
                  c.duration,
                  c.id,
                  c.isEdited,
                  c.title)
                ))
              .pipe(map( (course) => {
                return coursesActions.requestSingleCourseSuccess({course: course});
              }, catchError(() => of(coursesActions.requestSingleCourseFail({errorMessage: 'requestSingleCourse failed'})))
          ));
          }
        )
      );
    }
  )

  deleteCourse$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(coursesActions.requestDeleteCourse),
        mergeMap(({id}) => this.courseService.deleteCourse(id)
          .pipe(
            map(() => {
              return coursesActions.requestAllCourses();
            }),
            catchError(() => of(coursesActions.requestDeleteCourseFail({errorMessage: 'requestDeleteCourse failed'})))
          )
        )
      );
    }
  )

  editCourse$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(coursesActions.requestEditCourse),
        mergeMap(({body, id}) => this.courseService.editCourse(body, id)
          .pipe(
            map(() => {
              return coursesActions.requestEditCourseSuccess();
            }),
            catchError(() => of(coursesActions.requestEditCourseFail ({errorMessage: 'requestEditCourse failed'})))
          )
        )
      );
    }
  )

  createCourse$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(coursesActions.requestCreateCourse),
        mergeMap(({body}) => this.courseService.createCourse(body)
          .pipe(
            map(() => {
              return coursesActions.requestCreateCourseSuccess();
            }),
            catchError(() => of(coursesActions.requestCreateCourseFail ({errorMessage: 'requestCreateCourse failed'})))
          )
        )
      );
    }
  )

  redirectToTheCoursesPage$ = createEffect(() => this.actions$.pipe(
    ofType(coursesActions.requestCreateCourseSuccess, coursesActions.requestEditCourseSuccess , coursesActions.requestSingleCourseFail),
    tap(() => this.router.navigate(['/courses'])),
  ), {dispatch: false});

}
