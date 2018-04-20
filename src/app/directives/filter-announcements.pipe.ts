import { Pipe, PipeTransform } from '@angular/core';
import { Announcement } from '../models/announcement';
import { FilterContentService } from '../services/filter-content/filter-content.service'

@Pipe({
  name: 'filterAnnouncements',
  pure: false
})
export class FilterAnnouncementsPipe implements PipeTransform {

  private searchKey: string;

  constructor(private _filterContentService: FilterContentService){
    this._filterContentService.filterContent
      .subscribe((searchKey : string) => {
        this.searchKey = searchKey
        console.log('searchKey ', this.searchKey)
        // this.transform([1,2], 1);
      })
  }

  transform(value: any, args?: any): any {

    // console.log('searchString', args[1]);

    if(this.searchKey.length === 0){

    

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
    console.log('length ', this.searchKey.length)
    
    return filteredValues;
  }
  
  else {
    return null;
  }

  }

}
