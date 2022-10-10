import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'courses-app';
  isEditable: boolean = false;

  ngOnInit(): void {
    this.isEditable = true;
  }
}
