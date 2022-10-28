import {Injectable} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {authorActions} from "./authors.actions";
import {AuthorState} from "./authors.reducer";
import {authorQuery} from "./authors.selectors";

@Injectable()
export class AuthorsStateFacade  {

  addedAuthor$ = this.store.pipe(select(authorQuery.getAddedAuthors));
  authors$ = this.store.pipe(select(authorQuery.getAuthors));

  addAuthor = (authorName: string) =>
    this.store.dispatch(authorActions.requestAddAuthor({authorName: authorName}));

  getAuthors = ()=>this.store.dispatch(authorActions.requestAuthors());

  constructor(private store: Store<AuthorState>) {
  }
}
