import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {formArrayMinLengthValidator} from "../directives/formArrayMinLength.directive";

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

  formGroupCourse: FormGroup;
  formGroupAuthor: FormGroup;

  constructor() {
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
    if (this.formGroupCourse.status === "VALID")
    {
      alert(JSON.stringify(this.formGroupCourse.value, null, 2));
      //redirect
    }
  }

  get title() { return this.formGroupCourse.get('title'); }

  get description() { return this.formGroupCourse.get('description')}

  get duration() { return this.formGroupCourse.get('duration')?.value}

  onAuthorFormSubmit() {

    if (this.formGroupAuthor.status === "VALID")
    {
      const authorName  = this.formGroupAuthor.value['authorName'];

      (<FormArray>this.formGroupCourse.get('authors')).push(new FormControl(authorName));
     // need to ask why it is not purge authorName control;
      (<FormControl>(this.formGroupAuthor.value['authorName'])).setValue(null)

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
