import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {formArrayMinLengthValidator} from "../directives/formArrayMinLength.directive";
import * as moment from "moment";
import { ActivatedRoute } from '@angular/router';
import {CourseService} from "../../services/course.service";

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {
  courseFormModel = {
    title: '',
    description: '',
    duration: 0
  }
  authorFormModel = {
    authorName: ''
  }
  courseId: string | null;
  formGroupCourse: FormGroup;
  formGroupAuthor: FormGroup;

  constructor(private route: ActivatedRoute, private courseService: CourseService) {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.formGroupCourse = new FormGroup({
      title: new FormControl(this.courseFormModel.title, [
        Validators.required,
      ]),
      description: new FormControl(this.courseFormModel.description, [
        Validators.required
      ]),

      authors: new FormArray([], formArrayMinLengthValidator(1)),
      duration: new FormControl(this.courseFormModel.duration, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ])
    })
    this.formGroupAuthor = new FormGroup({
      authorName: new FormControl(this.authorFormModel.authorName, [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]+$')
      ])
    })
  }

  ngOnInit(): void {
  }

  onFormSubmit() {
    if (this.formGroupCourse.status === "VALID") {
      alert(JSON.stringify(this.formGroupCourse.value, null, 2));
      if (this.courseId) {
        this.courseService
          .editCourse({
            title: this.formGroupCourse.value.title,
            description: this.formGroupCourse.value.description,
            creationDate: moment().format('DD.MM.YYYY'),
            duration: this.formGroupCourse.value.duration,
            authors: this.formGroupCourse.value.authors,
            id: this.courseId,
          })
          .subscribe();
      } else {
        this.courseService
          .createCourse({
            title: this.formGroupCourse.value.title,
            description: this.formGroupCourse.value.description,
            duration: this.formGroupCourse.value.duration,
            authors: this.formGroupCourse.value.authors,
          })
          .subscribe();
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

      (<FormArray>this.formGroupCourse.get('authors')).push(new FormControl(authorName));
      this.formGroupAuthor.reset();
    }
  }
  get authorName() { return this.formGroupAuthor.get('authorName'); }

  get authors() { return (<FormArray>this.formGroupCourse.get('authors'))['controls']; }

  deleteAuthor(index: number) {
    (<FormArray>this.formGroupCourse.get('authors')).removeAt(index);
  }

  inputHandler(event:any) {
    // @ts-ignore
    this.duration = event.target.value
  }
}
