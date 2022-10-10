import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join'
})
export class JoinPipe implements PipeTransform {
  transform(authors: string[], sep = ','): string {
    return authors.join(sep);
  }
}
