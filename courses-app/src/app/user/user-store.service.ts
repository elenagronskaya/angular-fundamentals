import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {UserService} from './user.service';
import {IUser} from "../interfaces/auth.interfaces";

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
  setUserData(){
    this.userService.getUser().pipe(map((r)=>r.result)).subscribe(
      (user: IUser )=> {
        this.name$$.next(user.name);
        this.isAdmin$$.next(user.role === 'Admin');
      });
  }
}
