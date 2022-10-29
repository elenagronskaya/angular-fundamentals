import {createAction, props} from "@ngrx/store";

import {IAuthor} from "../../interfaces/auth.interfaces";

export const requestAuthors = createAction('requestAuthors');

export const requestAuthorsSuccess = createAction('requestAuthorsSuccess', props<{authors: IAuthor[]}>()  );

export const requestAuthorsFail = createAction('requestAuthorsFails');

export const  requestAddAuthor = createAction('requestAuthorsFail', props<{authorName: string}>());

export const  requestAddAuthorSuccess = createAction('requestAddAuthorSuccess', props<{author: IAuthor}>());

export const requestAddAuthorFail = createAction('requestAddAuthorFail');

export const resetAddedAuthor = createAction('resetAddedAuthor');

export const authorActions = {
  requestAuthors,
  requestAuthorsSuccess,
  requestAuthorsFail,
  requestAddAuthor,
  requestAddAuthorSuccess,
  requestAddAuthorFail,
  resetAddedAuthor
};
