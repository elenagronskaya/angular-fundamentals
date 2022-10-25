import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {formArrayMinLengthValidator} from "../directives/formArrayMinLength.directive";
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from "../../services/course.service";
import {BehaviorSubject, map, Observable} from "rxjs";
import {IAuthor} from "../../interfaces/auth.interfaces";
import {AuthorStoreService} from "../../services/author-store.service";
import {CourseStoreService} from "../../services/course-store.service";

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
  courseFormModel = {
    title: '',
    description: '',
    duration: 0,
    authors: []
  }
  authorFormModel = {
    authorName: ''
  }
  courseId: string | null =  '';
  formGroupCourse: FormGroup;
  formGroupAuthor: FormGroup;

  allAuthorList$$: BehaviorSubject<IAuthor[]> = new BehaviorSubject<IAuthor[]>([])

  allAuthorList$: Observable<IAuthor[]> = this.allAuthorList$$.asObservable();

  courseAuthorList$$: BehaviorSubject<IAuthor[]> = new BehaviorSubject<IAuthor[]>([]);

  buildFormGroupCourse()
  {
    debugger;
    return  new FormGroup({
      title: new FormControl(this.courseFormModel.title, [
        Validators.required,
      ]),
      description: new FormControl(this.courseFormModel.description, [
        Validators.required
      ]),

      authors: new FormArray(this.courseFormModel.authors.map(authorId=>new FormControl(authorId)), formArrayMinLengthValidator(1)),
      duration: new FormControl(this.courseFormModel.duration, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ])
    })
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router : Router,
    private courseService: CourseService,
    private courseStoreService: CourseStoreService,
    private authorStoreService: AuthorStoreService) {
    this.formGroupCourse = this.buildFormGroupCourse();


    this.formGroupAuthor = new FormGroup({
      authorName: new FormControl(this.authorFormModel.authorName, [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]+$')
      ])
    })
  }

  ngOnInit(): void {
    this.authorStoreService.getAllAuthors().subscribe((authors)=>{
      this.allAuthorList$$.next(authors);
    });

    this.courseId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.courseStoreService.getCourseById(this.courseId).subscribe((courseData)=> {
        if (courseData) {
          debugger;
          // @ts-ignore
          this.courseFormModel = {...courseData};
          this.formGroupCourse = this.buildFormGroupCourse();
        }
      });
    }
  }

  onFormSubmit() {
    if (this.formGroupCourse.status === "VALID") {
      const authors = (<FormArray>this.formGroupCourse.get('authors')).controls.map((id:any)=>id.value);
      if (this.courseId) {
        this.courseService
          .editCourse({
            title: this.formGroupCourse.value.title,
            description: this.formGroupCourse.value.description,
            duration: this.formGroupCourse.value.duration,
            authors: authors,
            id: this.courseId,
          })
          .subscribe(()=>{
            this.router.navigate(['/'])
          });
      } else {
        this.courseService
          .createCourse({
            title: this.formGroupCourse.value.title,
            description: this.formGroupCourse.value.description,
            duration: this.formGroupCourse.value.duration,
            authors:  authors
          })
          .subscribe(()=>{
            this.router.navigate(['/'])
          });
      }
      //redirect
    }
  }

  get title() { return this.formGroupCourse.get('title'); }

  get description() { return this.formGroupCourse.get('description')}

  get duration() { return this.formGroupCourse.get('duration')?.value}


  onAuthorFormSubmit() {
    if (this.formGroupAuthor.status === "VALID") {
      const authorName  = this.formGroupAuthor.value['authorName'];
      this.authorStoreService.createAuthor(authorName).subscribe((author)=>{
        this.allAuthorList$$.value.push(author);
        this.allAuthorList$$.next(this.allAuthorList$$.value);
        this.formGroupAuthor.reset();
        })
     }
  }
  get authorName() { return this.formGroupAuthor.get('authorName'); }

  getAuthorName(authorId: any): Observable<string>
  {
    return this.authorStoreService.authors$
    .pipe(map(authors=>
    {
      const author = authors.find(author=>author.id == authorId);
      return author? author.name : '';
    }))
  }

  get courseAuthors() { return (<FormArray>this.formGroupCourse.get('authors')).controls }

  assignAuthor(authorId: any, index: number) {
    (<FormArray>this.formGroupCourse.get('authors')).push(new FormControl(authorId))
    const prevAllAuthors = this.allAuthorList$$.value;
    this.allAuthorList$$.next(prevAllAuthors.filter(a=> a.id != authorId));
    return false;
  }

  reAssignAuthor(authorId: any, index: number) {
    debugger;
    this.authorStoreService.authors$.pipe(map(authors=> authors.find(a=>a.id == authorId))).subscribe((author)=>{
      if (author)
      {
        const prevAllAuthors = this.allAuthorList$$.value;
        prevAllAuthors.push(author);
        this.allAuthorList$$.next(prevAllAuthors);
      }
    });

    const indexx = (<FormArray>this.formGroupCourse.get('authors')).controls.findIndex((id:any)=>id.value != authorId);
    (<FormArray>this.formGroupCourse.get('authors')).removeAt(indexx)
    return false;
  }

  inputHandler(event:any) {
    // @ts-ignore
    this.duration = event.target.value
  }
}
