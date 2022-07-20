import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateFormat',
})
export class MomentPipe implements PipeTransform {
  date: any;

  transform(value: Date | moment.Moment, ...arg: string[]): any {
    let params = arg[0].split(' ');

    let val = String(value).split('.')[0];

    let val1 = String(value).split(' ')[0];

    if (arg[1] !== undefined) {
      moment.locale(arg[1]);
    } else {
      moment.locale('fr');
    }

    switch (params[0]) {
      case 'calendar':
        this.date = this.calendarTime(new Date(val1));
        if (this.date == 'Invalid date') this.date = '';
        break;
      case 'format':
        this.date = this.defaultFormat(value, params[1] || '');
        break;
      case 'relative':
        this.date = this.relativeTime(value, arg[0] || ' ');
        break;
      case 'local':
        this.date = this.local(new Date(val), params[2] || 'LLL');
        if (this.date == 'Invalid date') this.date = '';
        break;

      default:
        this.date = this.calendarTime(value);
        break;
    }

    return this.date;
  }

  private defaultFormat(value: any, dateFormat: any) {
    return moment(value).format(dateFormat);
  }

  private calendarTime(value: any) {
    return moment(value).calendar();
  }

  private relativeTime(value: any, dateFormat: string) {
    let params = dateFormat.split(' ');
    let relativeDate = value;

    if (params.length == 1) {
      relativeDate = moment(value).fromNow();
    } else if (params.length == 3) {
      if (params[1] == 'startof') {
        if (params[2] == 'hour') {
          relativeDate = moment().startOf('hour').fromNow();
        } else {
          relativeDate = moment().startOf('day').fromNow();
        }
      } else {
        if (params[2] == 'hour') {
          relativeDate = moment().endOf('hour').fromNow();
        } else {
          relativeDate = moment().endOf('day').fromNow();
        }
      }
    }
    return relativeDate;
  }

  private local(value: any, localFormat: any) {
    return moment(value).format(localFormat);
  }
}
