import {Component, Input} from "@angular/core";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-button',
  templateUrl: 'button.component.html',
  styleUrls: ['button.component.scss']
})

export class ButtonComponent {
  @Input() text = "";
  @Input() fontawesome?: IconDefinition;
}
