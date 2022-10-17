import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'durationToTime'})
export class DurationToTimePipe implements PipeTransform {
  transform(duration: number): string {

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
}
