import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import { IUserResponse} from "../interfaces/auth.interfaces";
@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) {}

  getUser(): Observable<IUserResponse> {
    return this.http.get<IUserResponse>(`${environment.baseUrl}/users/me`);
  }
}
