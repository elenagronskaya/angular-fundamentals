import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./shared/login/login.component";
import {RegistrationComponent} from "./shared/registration/registration.component";
import {CoursesComponent} from "./features/courses/courses.component";
import {CourseComponent} from "./features/course/course.component";
import {CourseFormComponent} from "./shared/course-form/course-form.component";
import {AuthorizedGuard} from "./auth/guard/authorized.guard";
import {AdminGuard} from "./auth/guard/admin.guard";
import {NotAuthorizedGuard} from "./auth/guard/not-authorized.guard";
import {authorizedCanActivateGuard} from "./auth/guard/authorizedCanActivate.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full',
    canLoad: [AuthorizedGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: 'registration',
    component: RegistrationComponent,
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: 'courses',
    component: CoursesComponent,
    canActivate: [authorizedCanActivateGuard],
  },
  {
    path: 'courses/add',
    component: CourseFormComponent,
    canLoad: [AuthorizedGuard],
    canActivate: [AdminGuard],
  },
  {
    path: 'courses/:id',
    component: CourseComponent,
    canLoad: [AuthorizedGuard]
  },
  {
    path: 'courses/edit/:id',
    component: CourseFormComponent,
    canLoad: [AuthorizedGuard],
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
