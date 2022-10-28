import {createAction, props} from "@ngrx/store";
import {ICourseData} from "../../interfaces/auth.interfaces";

export const requestAllCourses = createAction('requestAllCourses');
export const requestAllCoursesSuccess = createAction('requestAllCoursesSuccess', props<{courses: ICourseData[]}>());
export const requestAllCoursesFail = createAction('requestAllCoursesFail', props<{errorMessage: string}>());


export const requestSingleCourse = createAction('requestSingleCourse');
export const requestSingleCourseSuccess = createAction('requestSingleCourseSuccess', props<{course: ICourseData}>());
export const requestSingleCourseFail = createAction('requestSingleCourseFail', props<{errorMessage: string}>());


export const requestFilteredCourses = createAction('requestFilteredCourses', props<{filter: string}>());
export const requestFilteredCoursesSuccess = createAction('requestFilteredCoursesSuccess', props<{courses: ICourseData[]}>());

export const requestDeleteCourse = createAction('requestDeleteCourse', props<{id: string}>());
export const requestDeleteCourseFail = createAction('requestDeleteCourseFail', props<{errorMessage: string}>());

export const requestEditCourse = createAction('requestEditCourse', props<{course: ICourseData}>());
export const requestEditCourseSuccess = createAction('requestEditCourseSuccess');
export const requestEditCourseFail = createAction('requestEditCourseFail', props<{errorMessage: string}>());

export const requestCreateCourse = createAction('requestCreateCourse', props<{course: ICourseData}>());
export const requestCreateCourseSuccess = createAction('requestCreateCourseSuccess');
export const requestCreateCourseFail = createAction('requestCreateCourseFail', props<{errorMessage: string}>());

export const coursesActions = {
  requestAllCourses,
  requestAllCoursesSuccess,
  requestAllCoursesFail,

  requestSingleCourse,
  requestSingleCourseSuccess,
  requestSingleCourseFail,

  requestFilteredCourses,
  requestFilteredCoursesSuccess,

  requestDeleteCourse,
  requestDeleteCourseFail,

  requestEditCourse,
  requestEditCourseSuccess,
  requestEditCourseFail,

  requestCreateCourse,
  requestCreateCourseSuccess,
  requestCreateCourseFail,
};

