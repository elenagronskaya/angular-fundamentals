import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {CoursesState} from "./courses.reducer";
import {coursesQuery} from "./courses.selectors";
import {Actions} from "@ngrx/effects";
import {coursesActions} from "./courses.actions";
import {ICourseData} from "../../interfaces/auth.interfaces";

@Injectable()
export class CoursesStateFacade {

  isAllCoursesLoading$ = this.store.pipe(select(coursesQuery.isAllCoursesLoadingSelector));

  isSingleCourseLoading$ = this.store.pipe(select(coursesQuery.isSingleCourseLoadingSelector));

  isSearchingState$ = this.store.pipe(select(coursesQuery.isSearchingStateSelector));

  courses$ = this.store.pipe(select(coursesQuery.getCourse));

  allCourses$ = this.store.pipe(select(coursesQuery.getAllCourses));

  course$ = this.store.pipe(select(coursesQuery.getCourse));

  errorMessage$ = this.store.pipe(select(coursesQuery.getErrorMessage));

  getSingleCourse = (id: string) =>  this.store.dispatch(coursesActions.requestSingleCourse({id: id}));

  getFilteredCourses = (searchValue: string) =>  this.store.dispatch(coursesActions.requestFilteredCourses({searchValue}));

  editCourse = (body: ICourseData, id: string) =>  this.store.dispatch(coursesActions.requestEditCourse({body, id}));


  createCourse = (body: ICourseData) =>  this.store.dispatch(coursesActions.requestCreateCourse({body}));

  deleteCourse = (id: string) =>  this.store.dispatch(coursesActions.requestDeleteCourse({id}));


  constructor(private store: Store<CoursesState>,  private updates$: Actions) {
  }
}
