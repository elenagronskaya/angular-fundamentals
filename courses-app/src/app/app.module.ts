import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoursesModule} from "./features/courses/courses.module";
import {SharedModule} from "./shared/shared.module";
import {LoginModule} from "./shared/login/login.module";
import {RegistrationModule} from "./shared/registration/registration.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CourseFormModule} from "./shared/course-form/course-form.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoursesModule,
    LoginModule,
    RegistrationModule,
    FormsModule,
    ReactiveFormsModule,
    CourseFormModule
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
