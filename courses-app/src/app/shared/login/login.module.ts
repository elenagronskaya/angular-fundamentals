import {NgModule} from "@angular/core";

import {LoginComponent} from "./login.component";
import {SharedModule} from "../shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@NgModule({
  imports: [
    SharedModule, ReactiveFormsModule, FormsModule, NgIf
  ],
  declarations: [
    LoginComponent,
  ],
  exports: [
    LoginComponent
  ],
})
export class LoginModule { }
