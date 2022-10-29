import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedCanLoadGuard } from './auth/guard/authorized-can-load-guard.service';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./shared/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./shared/registration/registration.module').then((m) => m.RegistrationModule),
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./features/courses/courses.module').then((m) => m.CoursesModule),
    canLoad: [AuthorizedCanLoadGuard],
  },
  {
    path: '',
    redirectTo: '/courses',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
