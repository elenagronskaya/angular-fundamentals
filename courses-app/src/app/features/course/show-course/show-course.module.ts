import {NgModule} from "@angular/core";

import {AsyncPipe} from "@angular/common";
import {ShowCourseComponent} from "./show-course.component";
import {SharedModule} from "../../../shared/shared.module";

@NgModule({
  imports: [SharedModule, AsyncPipe],
  declarations: [
    ShowCourseComponent
  ],
  exports: [
    ShowCourseComponent
  ],
})
export class ShowCourseModule { }
