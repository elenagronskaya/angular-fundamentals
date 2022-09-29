import {NgModule} from "@angular/core";
import {HeaderComponent} from "./components/header/header.component";
import {ButtonComponent} from "./components/button/button.component";
import {InfoComponent} from "./components/info/info.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgClass, NgIf} from "@angular/common";


@NgModule({
  imports: [
    FontAwesomeModule,
    NgIf,
    NgClass,
  ],
  declarations: [
    HeaderComponent,
    ButtonComponent,
    InfoComponent,
  ],
  exports: [
    HeaderComponent,
    ButtonComponent,
    InfoComponent,
    FontAwesomeModule,
  ],
})
export class SharedModule { }
