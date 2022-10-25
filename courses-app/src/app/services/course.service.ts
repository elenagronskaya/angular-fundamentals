import {Injectable} from "@angular/core";
import {HttpClient} from '@angular/common/http';
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ICourseData, ICourseResponse, ICoursesResponse, IDeleteCourseResponse} from "../interfaces/auth.interfaces";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private http: HttpClient) {
  }

  getAll (): Observable<ICourseData[]> {
    return this.http.get<ICoursesResponse>(`${environment.baseUrl}/courses/all`)
      .pipe(map((coursesResponse) => {
        debugger;
      return coursesResponse.result;
    }))
  }

  getById (id: string): Observable<ICourseData> {
    return this.http.get<ICourseResponse>(`${environment.baseUrl}/courses/${id}`)
      .pipe(map((coursesResponse) => {
        return coursesResponse.result;
      }))
  }

  filter(filter: string): Observable<ICourseData[]> {
    return this.http.get<ICoursesResponse>(`${environment.baseUrl}/courses/filter`, { params: { title: filter} })
      .pipe(map((coursesResponse) => {
        return coursesResponse.result;
      }));
  }

  createCourse(course: ICourseData): Observable<ICourseData> {
    return this.http.post<ICourseData>(`${environment.baseUrl}/courses/add`, { ...course });
  }

  editCourse(course: ICourseData): Observable<ICourseData> {
    return this.http.put<ICourseData>(`${environment.baseUrl}/courses/${course.id}`, { ...course });
  }

  deleteCourse(id: string) : Observable<any> {
    return this.http.delete<IDeleteCourseResponse>(`${environment.baseUrl}/courses/${id}`);
  }
}

