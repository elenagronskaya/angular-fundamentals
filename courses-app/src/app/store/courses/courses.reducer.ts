import {createReducer, on} from "@ngrx/store";
import {CourseDataDTO} from "../../interfaces/auth.interfaces";
import {
  coursesActions
} from "./courses.actions";

export interface CoursesState {
  allCourses: CourseDataDTO[],
  courses: CourseDataDTO[],
  course: CourseDataDTO | null,
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

  on(coursesActions.requestAllCourses, (state) => {
    return ({
      ...state,
      isAllCoursesLoading: true,
    })}
  ),

  on(coursesActions.requestAllCoursesSuccess, (state, {courses}) => {
    return ({
      ...state,
      allCourses: courses,
      isAllCoursesLoading: false
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
      isAllCoursesLoading: false,
    })}
  ),

  on(coursesActions.requestSingleCourse, (state) => {
    return ({
      ...state,
      isSingleCourseLoading: true
    })}
  ),
  on(coursesActions.requestSingleCourseSuccess, (state, {course}) => {
    return ({
      ...state,
      course: course,
      isSingleCourseLoading: false
    })}
  ),

  on(coursesActions.requestSingleCourseFail, (state, {errorMessage}) => {
    return ({
      ...state,
      errorMessage: errorMessage,
      isSingleCourseLoading: false
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
