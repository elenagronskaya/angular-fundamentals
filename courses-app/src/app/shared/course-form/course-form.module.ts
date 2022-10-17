import {NgModule} from "@angular/core";

import {CourseFormComponent} from "./course-form.component";
import {SharedModule} from "../shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

@NgModule({
    imports: [SharedModule, ReactiveFormsModule, NgIf, NgForOf],
  declarations: [
    CourseFormComponent
  ],
  exports: [
    CourseFormComponent
  ],
})
export class CourseFormModule { }
