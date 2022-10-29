import { CoursesComponent } from './courses.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/auth/guard/admin.guard';
import {AuthorizedCanLoadGuard} from 'src/app/auth/guard/authorized-can-load-guard.service';
import {CourseFormComponent} from "../../shared/course-form/course-form.component";
import {ShowCourseComponent} from "../course/show-course/show-course.component";

const routes: Routes = [
  {
    path: 'add',
    component: CourseFormComponent,
    canLoad: [AuthorizedCanLoadGuard],
    canActivate: [AdminGuard],
  },
  {
    path: ':id',
    component: ShowCourseComponent,
    canLoad: [AuthorizedCanLoadGuard],
  },
  {
    path: 'edit/:id',
    component: CourseFormComponent,
    canLoad: [AuthorizedCanLoadGuard],
    canActivate: [AdminGuard],
  },
  {
    path: '',
    component: CoursesComponent,
    canLoad: [AuthorizedCanLoadGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
