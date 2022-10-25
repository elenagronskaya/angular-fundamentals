import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {RegistrationComponent} from "./registration.component";
import {NotAuthorizedGuard} from "../../auth/guard/not-authorized.guard";

const routes: Routes = [
  {
    path: '',
    component: RegistrationComponent,
    canActivate: [NotAuthorizedGuard],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationRoutingModule {}
