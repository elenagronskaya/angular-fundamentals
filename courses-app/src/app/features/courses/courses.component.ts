import { Component, OnInit, Input } from '@angular/core';
import {IMockedCoursesList} from "../../../mocked-data";

import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  faPen = faPen;
  faTrash = faTrash;

  constructor() { }

  ngOnInit(): void {
  }
  @Input() courses: IMockedCoursesList[] = [];
  @Input() isEditable: boolean = false;
}
