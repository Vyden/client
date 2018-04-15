import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterAnnouncements'
})
export class FilterAnnouncementsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
