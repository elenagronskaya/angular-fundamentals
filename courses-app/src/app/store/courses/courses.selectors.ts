import {createFeatureSelector, createSelector} from "@ngrx/store";
import {coursesFeatureKey, CoursesState} from "./courses.reducer";


const getCoursesState = createFeatureSelector<CoursesState>(coursesFeatureKey);

export const isAllCoursesLoadingSelector = createSelector(
  getCoursesState,
  (state: CoursesState) => state.isAllCoursesLoading
);

export const isSearchingStateSelector = createSelector(
  getCoursesState,
  (state: CoursesState) => state.isSearchState
);

export const getCourses = createSelector(
  getCoursesState,
  (state: CoursesState) => state.courses
);

export const getAllCourses = createSelector(
  getCoursesState,
  (state: CoursesState) => state.allCourses
);


export const getCourse = createSelector(
  getCoursesState,
  (state: CoursesState) => state.course
);


export const getErrorMessage = createSelector(
  getCoursesState,
  (state: CoursesState) => state.errorMessage
);

export const coursesQuery = {
  isAllCoursesLoadingSelector,
  isSearchingStateSelector,
  getCourses,
  getCourse,
  getErrorMessage,
}



