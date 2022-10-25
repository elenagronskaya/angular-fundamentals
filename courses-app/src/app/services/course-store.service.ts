import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {ICourseData} from "../interfaces/auth.interfaces";
import {CourseService} from "./course.service";

@Injectable({
  providedIn: 'root'
})
export class CourseStoreService {
  constructor(private courseService: CourseService) {
  }
  private isLoading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  isLoading$: Observable<boolean> = this.isLoading$$.asObservable();

  private courses$$: BehaviorSubject<ICourseData[]> = new BehaviorSubject<ICourseData[]>([]);
  courses$: Observable<ICourseData[]> = this.courses$$.asObservable();

  private showCourse$$: BehaviorSubject<ICourseData | null> = new BehaviorSubject<ICourseData | null>(null)
  showCourse$: Observable<ICourseData | null> = this.showCourse$$.asObservable()

  getAll ():Observable<ICourseData[]>{
    this.isLoading$$.next(true)
    return this.courseService.getAll().pipe(tap((courses) => {
                                                this.courses$$.next(courses);
                                                this.isLoading$$.next(false)
      },
                                          (error)=>{ this.isLoading$$.next(false)}));
  }

  filter (filter: string):Observable<ICourseData[]>{
    this.isLoading$$.next(true)
    return this.courseService.filter(filter).pipe(tap( (courses) => {
        this.courses$$.next(courses);
        this.isLoading$$.next(false)
      },
      (error)=>{ this.isLoading$$.next(false)}));
  }

  createCourse(course: ICourseData): void{
    this.isLoading$$.next(true)
    this.courseService.createCourse(course)
      .subscribe((courses) => {
          this.isLoading$$.next(false);
      },(error)=>{ this.isLoading$$.next(false)});
  }

  editCourse(course: ICourseData): void{
    this.isLoading$$.next(true)
    this.courseService.editCourse(course)
      .subscribe((courses) => {
        this.isLoading$$.next(false);
      },(error)=>{ this.isLoading$$.next(false)});
  }

  getCourseById(id: string): Observable<ICourseData>
  {
    this.isLoading$$.next(true);
    return this.courseService.getById(id).pipe(tap((courseData) => {
      this.showCourse$$.next(courseData);
      this.isLoading$$.next(false);
    },(error)=>{ this.isLoading$$.next(false)}))
  }

  deleteCourseById(id: string)
  {
    this.isLoading$$.next(true);
    this.isLoading$$.next(true)
    this.courseService.deleteCourse(id)
      .subscribe((result)=>{
        this.courses$$.next(this.courses$$.value.filter((course)=>course.id != id));
        this.isLoading$$.next(false);
      },(error)=>{ this.isLoading$$.next(false)});
  }
}

