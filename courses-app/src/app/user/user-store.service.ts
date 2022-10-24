import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserService} from './user.service';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class UserStoreService {
  private name$$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  name$: Observable<string> = this.name$$.asObservable();

  private isAdmin$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();

  constructor(private userService: UserService) {}

  resetUserData(): void
  {
    this.name$$.next('');
    this.isAdmin$$.next(false);
  }
  setUserData(): void {
    this.userService.getUser().pipe(
      tap(response => {
          this.name$$.next(response.result.name);
          this.isAdmin$$.next(response.result.role === 'Admin');
        }
      )
    ).subscribe();
  }
}
