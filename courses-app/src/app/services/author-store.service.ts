import { Injectable } from '@angular/core';
import { AuthorsService } from './authors.service';
import {BehaviorSubject, map, Observable, tap} from 'rxjs';
import {IAuthor} from "../interfaces/auth.interfaces";

@Injectable({
  providedIn: 'root',
})
export class AuthorStoreService {
  private isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isLoading$: Observable<boolean> = this.isLoading$$.asObservable();

  private authors$$: BehaviorSubject<IAuthor[]> = new BehaviorSubject<IAuthor[]>([]);
  authors$: Observable<IAuthor[]> = this.authors$$.asObservable();

  constructor(private authorsService: AuthorsService) {}

  getAuthorByIds(ids: string[]): Observable<IAuthor[]> {
    return this.authors$.pipe(map(authors => {
        const filteredArray = authors.filter(x=> ids.includes(x.id));
        return filteredArray;
      }));
  }

  getAuthorById(id: string): Observable<IAuthor | undefined > {
    return this.authors$.pipe(map(authors=>{
      const author = authors.find(x=>x.id === id);

      return author
    }));
  }

  getAllAuthors(): Observable<IAuthor[]> {
     return this.authorsService.getAll().pipe(map(authors=>authors.result),tap((authors) => {
      this.authors$$.next(authors);
    }));
  }

  createAuthor(authorName: string): Observable<IAuthor> {
    return this.authorsService.addAuthor(authorName).pipe(map(authorResponse=>authorResponse.result));
  }
}
