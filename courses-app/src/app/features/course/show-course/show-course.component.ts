import {Component, OnInit} from '@angular/core';
import {AuthorStoreService} from "../../../services/author-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CourseStoreService} from "../../../services/course-store.service";
import {map, Observable} from "rxjs";
import {ICourseData} from "../../../interfaces/auth.interfaces";


@Component({
  selector: 'app-show-course',
  templateUrl: './show-course.component.html',
  styleUrls: ['./show-course.component.scss']
})
  export class ShowCourseComponent implements OnInit {

  constructor(private authorStoreService: AuthorStoreService, private activatedRoute: ActivatedRoute, private router: Router, private courseStoreService: CourseStoreService) { }

  authorList$: Observable<string[]> | null = null
  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.courseStoreService.getCourseById(id).subscribe((course)=>{
        this.authorList$ = this.authorStoreService.getAuthorByIds(course.authors ?? [])
          .pipe(map(
              (authors)=>{
                 return authors.map(a=>a.name)}
            )
          );
      })
    }
  }

  get course(): Observable<ICourseData | null> {
    return this.courseStoreService.showCourse$;
  }

  backToCourse(): void {
    this.router.navigate(['/courses']);
  }
}

