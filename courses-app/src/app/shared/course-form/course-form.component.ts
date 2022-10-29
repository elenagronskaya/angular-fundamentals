import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {formArrayMinLengthValidator} from "../directives/formArrayMinLength.directive";
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from "../../services/course.service";
import {BehaviorSubject, map, Observable} from "rxjs";
import {IAuthor} from "../../interfaces/auth.interfaces";
import {AuthorStoreService} from "../../services/author-store.service";
import {CourseStoreService} from "../../services/course-store.service";
import {AuthorsStateFacade} from "../../store/authors/authors.facade";

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


  get allAuthorList$() {
    return this.authorsStateFacade.authors$;
  }

  courseAuthorList$$: BehaviorSubject<IAuthor[]> = new BehaviorSubject<IAuthor[]>([]);

  buildFormGroupCourse()
  {
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
    private authorsStateFacade: AuthorsStateFacade,
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
    this.authorsStateFacade.addedAuthor$.subscribe(()=>
    {
      this.formGroupAuthor.reset();
    })

    this.authorsStateFacade.getAuthors();


    this.courseId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.courseId) {
      this.courseStoreService.getCourseById(this.courseId).subscribe((courseData)=> {
        if (courseData) {
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
            authors: authors
          }, this.courseId)
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


      this.authorsStateFacade.addAuthor(authorName);


     }
  }
  get authorName() { return this.formGroupAuthor.get('authorName'); }

  getAuthorName(authorId: any): Observable<string>
  {
    return this.authorsStateFacade.authors$
    .pipe(map(authors=>
    {
      const author = authors.find(author=>author.id == authorId);
      return author? author.name : '';
    }))
  }

  get courseAuthors() { return (<FormArray>this.formGroupCourse.get('authors')).controls }

  assignAuthor(authorId: any, index: number) {
    return false;
  }

  reAssignAuthor(authorId: any, index: number) {
    return false;
  }

  inputHandler(event:any) {
    // @ts-ignore
    this.duration = event.target.value
  }
}
