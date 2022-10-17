import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  @Input() title?:string;
  @Input() description?:string;
  @Input() authors?:string[];
  @Input() duration?:number;
  @Input() created?: string;

  constructor() { }

  ngOnInit(): void {
  }
}

