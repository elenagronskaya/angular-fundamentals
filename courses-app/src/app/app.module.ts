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
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { TokenInterceptor } from './auth/interceptors/token.interceptor';
import {AuthModule} from "./auth/auth.module";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {effects, facades} from "./store";
import {CommonModule} from "@angular/common";
import {authFeatureKey, authReducer} from "./auth/store/auth.reducer";
import {userFeatureKey, userReducer} from "./user/store/user.reduser";
import {authorFeatureKey, authorReducer} from "./store/authors/authors.reducer";
import {coursesFeatureKey, coursesReducer} from "./store/courses/courses.reducer";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    CoursesModule,
    LoginModule,
    RegistrationModule,
    FormsModule,
    ReactiveFormsModule,
    CourseFormModule,
    AuthModule,
    CommonModule,
    StoreModule.forRoot({ [authFeatureKey]: authReducer,
                                  [userFeatureKey]: userReducer,
                                  [authorFeatureKey]: authorReducer,
                                  [coursesFeatureKey]: coursesReducer,
    }),


    EffectsModule.forRoot(effects)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    ...facades
  ],

  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
