import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {IAuthorResponse, IAuthorsResponse} from '../interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})

export class AuthorsService {

  constructor(private http: HttpClient) {}

  getAll(): Observable<IAuthorsResponse> {
    return this.http.get<IAuthorsResponse>(`${environment.baseUrl}/authors/all`);
  }

  getAuthor(id: string): Observable<IAuthorsResponse> {
    return this.http.get<IAuthorsResponse>(`${environment.baseUrl}/authors`, { params: { id } });
  }

  addAuthor(name: string): Observable<IAuthorResponse> {
    return this.http.post<IAuthorResponse>(`${environment.baseUrl}/authors/add`, {name});
  }

  deleteAuthor(id: string): Observable<IAuthorsResponse> {
    return this.http.delete<IAuthorsResponse>(`${environment.baseUrl}/authors`, { params: { id } });
  }

}
