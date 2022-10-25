import {NgModule} from "@angular/core";
import {HeaderComponent} from "./components/header/header.component";
import {ButtonComponent} from "./components/button/button.component";
import {InfoComponent} from "./components/info/info.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AsyncPipe, NgClass, NgIf} from "@angular/common";
import {SearchComponent} from "./search/search.component";
import {EmailValidatorDirective} from "./directives/email.directive";
import {PasswordValidatorDirective} from "./directives/password.directive";
import {FormsModule} from "@angular/forms";
import {DurationToTimePipe} from "./pipes/duration.pipe";
import {CreatedCourseTimePipe} from "./pipes/created-course.pipe";
import {JoinPipe} from "./pipes/join.pipe";
import {RouterLink} from "@angular/router";



@NgModule({
    imports: [
        FontAwesomeModule,
        NgIf,
        NgClass,
        FormsModule,
        RouterLink,
        AsyncPipe,
    ],
  declarations: [
    HeaderComponent,
    ButtonComponent,
    InfoComponent,
    SearchComponent,
    EmailValidatorDirective,
    PasswordValidatorDirective,
    DurationToTimePipe,
    CreatedCourseTimePipe,
    JoinPipe
  ],
  exports: [
    HeaderComponent,
    ButtonComponent,
    InfoComponent,
    FontAwesomeModule,
    SearchComponent,
    EmailValidatorDirective,
    PasswordValidatorDirective,
    DurationToTimePipe,
    CreatedCourseTimePipe,
    JoinPipe
  ],
})
export class SharedModule { }
