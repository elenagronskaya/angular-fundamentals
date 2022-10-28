import {createReducer, on} from "@ngrx/store";
import {authorActions} from "./authors.actions";
import {IAuthor} from "../../interfaces/auth.interfaces";

export interface AuthorState {
  authors: IAuthor[],
  addedAuthor: IAuthor | null;
  errorAuthors: string |  null;
}

export const authorFeatureKey = 'author';

export const initialState: AuthorState = {
  authors: [],
  addedAuthor: null,
  errorAuthors: null,
};

export const authorReducer = createReducer(
  initialState,
  on(authorActions.requestAuthorsSuccess, (state, { authors  }) => {
    return ({
      ...state,
      authors
    })}
  ),

  on(authorActions.requestAddAuthorSuccess, (state, { author  }) => {
    const authors = [...state.authors];
    authors.push(author);
    return ({
      ...state,
      addedAuthor: author,
      authors:  authors
    })}
  ),

  on(authorActions.requestAuthorsFail, (state) => {
    return ({
      ...state,
      authors: [],
      errorAuthors: 'Fetch authors is fail'
    })}
  ),

on(authorActions.requestAddAuthorFail, (state) => {
  return ({
    ...state,
    addedAuthor: null,
    errorAuthors: 'Fetch author is fail'
  })}
  )
)
