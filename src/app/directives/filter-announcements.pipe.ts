import { Pipe, PipeTransform } from '@angular/core';
import { Announcement } from '../models/announcement';

@Pipe({
  name: 'filterAnnouncements'
})
export class FilterAnnouncementsPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    let filteredValues: Announcement [] = value.slice(0)

    let extraValue: Announcement [] = [];
    filteredValues = filteredValues.filter((announcement:  Announcement) => {
      if(announcement.pinned) {
        return true;
      }
      extraValue.push(announcement);
      return false;
    })

    for(var i = 0 ;  i < extraValue.length ; i++){
      filteredValues.push(extraValue[i])
    }
    //console.log(value);
    return filteredValues;
  }

}
