import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { RegistrationComponent } from './features/registration/registration.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './shared/components/header/header.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { InfoComponent } from './shared/components/info/info.component';
import {CoursesModule} from "./features/courses/courses.module";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HeaderComponent,
    ButtonComponent,
    InfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    CoursesModule,
  ],
  providers: [],
  exports: [
    ButtonComponent,
    InfoComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
