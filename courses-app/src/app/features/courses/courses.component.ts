import { Component, OnInit } from '@angular/core';

import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {Observable} from "rxjs";
import {ICourseData} from "../../interfaces/auth.interfaces";
import {Router} from "@angular/router";
import {CourseStoreService} from "../../services/course-store.service";
import {AuthorStoreService} from "../../services/author-store.service";
import {UserStoreService} from "../../user/user-store.service";
import {CoursesStateFacade} from "../../store/courses/courses.facade";
import {AuthStateFacade} from "../../auth/store/auth.facade";
import {UserStateFacade} from "../../user/store/user.fasad";


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  faPen = faPen;
  faTrash = faTrash;
  courses$ = this.courseStoreService.courses$;

  constructor(private courseStoreService: CourseStoreService,
              private authorStoreService: AuthorStoreService,
              private userStoreService: UserStoreService,
              private userStateFacade : UserStateFacade,
              private coursesStateFacade : CoursesStateFacade,
              private router: Router) {}

  searchCourse(filter:string):void{
    if (filter) {
     this.courseStoreService.filter(filter).subscribe();
   }else {
      this.courseStoreService.getAll().subscribe();
    }
  }

  ngOnInit(): void {
    this.authorStoreService.getAllAuthors().subscribe(()=>{
      this.searchCourse('');
    });
  }

  get isEditable(): Observable<boolean> {
    return this.userStateFacade.isAdmin$;
  }

  onSearch(searchFilter: string) {
    this.searchCourse(searchFilter);
  }
  get courses(): Observable<ICourseData[]> {
    return this.courseStoreService.courses$;
  }

  onCreateCourse(event: any ) {
    debugger;
    this.router.navigate(['/courses/add'])
  }

  showCourse(id: any): void {
    this.router.navigate([`/courses/${id}`]);
  }

  onEditCourse(id: any) {
    this.router.navigate([`/courses/edit/${id}`]);
  }

  onDeleteCourse(id: any) {
    this.courseStoreService.deleteCourseById(id);
  }
}
