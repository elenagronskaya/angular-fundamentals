import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {CoursesComponent} from "./courses.component";
import {CourseModule} from "../course/course.module";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";


@NgModule({
  imports: [SharedModule, CourseModule, NgIf, NgForOf, FormsModule],
  declarations: [CoursesComponent],
  exports: [CoursesComponent],
})
export class CoursesModule { }
