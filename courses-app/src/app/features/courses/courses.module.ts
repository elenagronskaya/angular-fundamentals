import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {CoursesComponent} from "./courses.component";
import {CourseModule} from "../course/course.module";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {CoursesRoutingModule} from "./courses-routing.module";
import {ShowCourseModule} from "../course/show-course/show-course.module";


@NgModule({
  imports: [SharedModule, CourseModule, ShowCourseModule, NgIf, NgForOf, FormsModule, CoursesRoutingModule, AsyncPipe],
  declarations: [CoursesComponent],
  exports: [CoursesComponent],
})
export class CoursesModule { }
