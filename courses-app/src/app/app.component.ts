import { Component } from '@angular/core';
import {IMockedCoursesList, mockedCoursesList} from "../mocked-data";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'courses-app';
  courses: IMockedCoursesList[] = [];
  isEditable: boolean = false;

  ngOnInit(): void {
    this.courses = mockedCoursesList;
    this.isEditable = true;
  }
}
