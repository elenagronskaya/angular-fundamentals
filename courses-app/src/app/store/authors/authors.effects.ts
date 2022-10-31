import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, mergeMap, of} from "rxjs";
import {catchError} from "rxjs/operators";
import {authorActions} from "./authors.actions";
import {AuthorsService} from "../../services/authors.service";

@Injectable()
export class AuthorEffects {
  getAuthors$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(authorActions.requestAuthors),
        mergeMap(() => this.authorsService.getAll()
          .pipe(
            map(response => {
              return authorActions.requestAuthorsSuccess({authors: response.result});
            }),
            catchError(() => of(authorActions.requestAuthorsFail()))
          )
        )
      );
    }
  )

  addAuthor$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(authorActions.requestAddAuthor),
        mergeMap((payload) => this.authorsService.addAuthor(payload.authorName)
          .pipe(
            map(response => {
              return authorActions.requestAddAuthorSuccess({author: response.result});
            }),
            catchError(() => of(authorActions.requestAddAuthorFail()))
          )
        )
      );
    }
  )

 constructor(private actions$: Actions, private authorsService: AuthorsService) {
 }
}
