import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'momenttime'
})
export class MomenttimePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
   // console.log(value);
    return moment(value);
  }

}
