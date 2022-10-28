import {createReducer, on} from "@ngrx/store";
import {ICourseData} from "../../interfaces/auth.interfaces";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {
  coursesActions, requestAllCoursesFail,
  requestAllCoursesSuccess, requestCreateCourseFail, requestDeleteCourseFail, requestEditCourseFail,
  requestFilteredCoursesSuccess, requestSingleCourseFail,
  requestSingleCourseSuccess
} from "./courses.actions";
import {getErrorMessage, isAllCoursesLoadingSelector} from "./courses.selectors";

export interface CoursesState {
  allCourses: ICourseData[],
  courses: ICourseData[],
  course: ICourseData | null,
  isAllCoursesLoading: boolean,
  isSingleCourseLoading: boolean,
  isSearchState: boolean,
  errorMessage: string | null
}

export const coursesFeatureKey = 'courses';

export const initialState: CoursesState = {
  allCourses : [],
  courses: [],
  course: null,
  isAllCoursesLoading: false,
  isSingleCourseLoading: false,
  isSearchState: false,
  errorMessage: null,

};

export const coursesReducer = createReducer(
  initialState,
  on(coursesActions.requestAllCoursesSuccess, (state, {courses}) => {
    return ({
      ...state,
      allCourses: courses,
    })}
  ),

  on(coursesActions.requestSingleCourseSuccess, (state, {course}) => {
    return ({
      ...state,
      course: course,
    })}
  ),

  on(coursesActions.requestFilteredCoursesSuccess, (state, {courses}) => {
    return ({
      ...state,
      courses: courses,
    })}
  ),


  on(coursesActions.requestAllCoursesFail, (state, {errorMessage}) => {
    return ({
      ...state,
      errorMessage: errorMessage,
    })}
  ),


  on(coursesActions.requestSingleCourseFail, (state, {errorMessage}) => {
    return ({
      ...state,
      errorMessage: errorMessage,
    })}
  ),


  on(coursesActions.requestDeleteCourseFail, (state, {errorMessage}) => {
    return ({
      ...state,
      errorMessage: errorMessage,
    })}
  ),

  on(coursesActions.requestEditCourseFail, (state, {errorMessage}) => {
    return ({
      ...state,
      errorMessage: errorMessage,
    })}
  ),

  on(coursesActions.requestCreateCourseFail, (state, {errorMessage}) => {
    return ({
      ...state,
      errorMessage: errorMessage,
    })}
  ),

);
