import {NgModule} from "@angular/core";
import {RegistrationComponent} from "./registration.component";
import {SharedModule} from "../shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {RegistrationRoutingModule} from "./registration-routing.module";


@NgModule({
  imports: [SharedModule, ReactiveFormsModule, FormsModule, NgIf, RegistrationRoutingModule],
  declarations: [
    RegistrationComponent
  ],
  exports: [
    RegistrationComponent
  ],
})
export class RegistrationModule { }
