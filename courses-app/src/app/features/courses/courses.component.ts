import { Component, OnInit, Input } from '@angular/core';
import {IMockedCoursesList, mockedCoursesList} from "../../../mocked-data";

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
  searchCourse(filter:string): IMockedCoursesList[]{
    return mockedCoursesList.filter(course=> !filter
      || course.title.toLowerCase().includes(filter.toLowerCase()));
  }

  ngOnInit(): void {
    this.courses = this.searchCourse('');
  }
  courses: IMockedCoursesList[] = [];
  @Input() isEditable: boolean = false;

  onSearch(searchFilter: string) {
    this.courses = this.searchCourse(searchFilter);
  }
}
