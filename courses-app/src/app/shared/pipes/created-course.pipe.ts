import {Pipe, PipeTransform} from "@angular/core";
import * as moment from "moment/moment";

@Pipe({name: 'createdCourseTime'})
export class CreatedCourseTimePipe implements PipeTransform {
  transform(createdTime: string): string {

    return createdTime ? moment(createdTime).format('DD.MM.YYYY') : moment().format('DD.MM.YYYY') ;
  };
}
