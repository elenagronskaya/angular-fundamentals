import {NgModule} from "@angular/core";
import {RegistrationComponent} from "./registration.component";
import {SharedModule} from "../shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";


@NgModule({
  imports: [SharedModule, ReactiveFormsModule, FormsModule, NgIf],
  declarations: [
    RegistrationComponent
  ],
  exports: [
    RegistrationComponent
  ],
})
export class RegistrationModule { }
