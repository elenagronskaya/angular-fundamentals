import {createFeatureSelector, createSelector} from "@ngrx/store";
import {authorFeatureKey, AuthorState} from "./authors.reducer";

const getAuthorState = createFeatureSelector<AuthorState>(authorFeatureKey);

export const getAddedAuthors = createSelector(
  getAuthorState,
  (state: AuthorState) => state.addedAuthor
);

export const getAuthors = createSelector(
  getAuthorState,
  (state: AuthorState) => state.authors
);

export const authorQuery = {
  getAddedAuthors,
  getAuthors
}
