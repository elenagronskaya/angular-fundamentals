import { Component, OnInit, Input } from '@angular/core';

import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {Observable, tap} from "rxjs";
import {ICourseData} from "../../interfaces/auth.interfaces";
import {CourseService} from "../../services/course.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  faPen = faPen;
  faTrash = faTrash;
  constructor(private courseService: CourseService,  private router: Router) {}

  searchCourse(filter:string): Observable<ICourseData[]>{

    if (filter) {
     return this.courseService.filter(filter)
       .pipe(tap((courseResponse: ICourseData[]) => {
         this.courses = courseResponse
       }));
   }
     return this.courseService.getAll()
       .pipe(tap((courseResponse: ICourseData[]) => {
         this.courses = courseResponse
       }));
  }

  ngOnInit(): void {
    this.searchCourse('').subscribe();
  }
  courses: ICourseData[] = [];
  @Input() isEditable: boolean = false;

  onSearch(searchFilter: string) {
    this.searchCourse(searchFilter).subscribe()
  }
  onCreateCourse(event: any ) {
    this.router.navigate(['/courses/add'])
  }
}
