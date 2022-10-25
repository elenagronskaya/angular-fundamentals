import {Pipe, PipeTransform} from "@angular/core";
import * as moment from "moment/moment";

@Pipe({name: 'createdCourseTime'})
export class CreatedCourseTimePipe implements PipeTransform {

  transform(createdTime: string): string {
    return createdTime ? moment(createdTime,"DD/MM/YYYY").format('DD.MM.YYYY') : moment().format('DD.MM.YYYY') ;
  };
}
