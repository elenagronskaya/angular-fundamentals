import { Injectable } from '@angular/core';
import {SessionStorageService} from "./session-storage.service";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, tap, throwError} from "rxjs";
import {ILoginData, IRegistrationData, IRegistrationRequest} from "../../interfaces/auth.interfaces";
import {environment} from "../../../environments/environment";
import {UserStoreService} from "../../user/user-store.service";

class LoginResponse{
  successful: boolean = false;
  result: string = '';
  user: {
    email: string
    name: string
  } = {
    email: '',
    name: ''
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService,
    private userStoreService : UserStoreService
  ) {}

  isAuth = this.sessionStorageService.getToken() !== null;

  private isAuthorized$$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(this.isAuth);

  isAuthorized$: Observable<boolean> = this.isAuthorized$$.asObservable();
  login(data: ILoginData){
    return this.http
      .post<LoginResponse>(`${environment.baseUrl}/login`, data)
      .pipe(catchError((error) => throwError(error)));
  }

  logout():Observable<any>{
    return this.http
      .delete<any>(`${environment.baseUrl}/logout`)
      .pipe(
        tap((response) => {
          this.isAuthorized$$.next(false);
          this.sessionStorageService.deleteToken();
          this.userStoreService.resetUserData();
        }),catchError((error) => throwError(error))
      );
  }

  register(data: IRegistrationData): Observable<IRegistrationRequest> {
    return this.http
      .post<IRegistrationRequest>(`${environment.baseUrl}/register`, data)
      .pipe(catchError((error) => throwError(error)));
  }


  setAuth(): void {
      const isAuth = this.sessionStorageService.getToken() !== null;
      this.isAuthorized$$.next(isAuth);
  }
}
