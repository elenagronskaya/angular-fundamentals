import {NgModule} from "@angular/core";

import {CourseComponent} from "./course.component";
import {SharedModule} from "../../shared/shared.module";
import {AsyncPipe} from "@angular/common";

@NgModule({
    imports: [SharedModule, AsyncPipe],
  declarations: [
    CourseComponent
  ],
  exports: [
    CourseComponent
  ],
})
export class CourseModule { }
