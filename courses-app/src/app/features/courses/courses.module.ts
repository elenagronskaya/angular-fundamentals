import {NgModule} from "@angular/core";
import {SharedModule} from "../../shared/shared.module";
import {CoursesComponent} from "./courses.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ButtonComponent} from "../../shared/components/button/button.component";


@NgModule({
  imports: [SharedModule, FontAwesomeModule,],
  declarations: [CoursesComponent, ButtonComponent],
  exports: [CoursesComponent],
})
export class CoursesModule { }
