import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

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
  courseCreated = this.created ? moment(this.created).format('DD.MM.YYYY') : moment().format('DD.MM.YYYY') ;

  dataFormat (duration:number): string{
    let minutes = duration % 60;
    let hours = (duration - minutes) / 60;

    return (
      hours.toString().padStart(2, '0') +
      ':' +
      minutes.toString().padStart(2, '0') +
      ' hour' +
      (hours > 1 ? 's' : '')
    );
  };

  constructor() { }

  ngOnInit(): void {
  }
}

