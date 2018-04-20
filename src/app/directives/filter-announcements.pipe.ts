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
        // this.transform([1,2], 1);
      })
  }

  transform(value: any, args?: any): any {

    let filteredValues: Announcement [] = value.slice(0)
    let extraValue: Announcement [] = [];
   


    //checking if there is a search word
    if(this.searchKey.length === 0){   
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
  
  else {
    filteredValues = filteredValues.filter((announcement:  Announcement) => {
      // if(announcement.pinned) {
        if(announcement.text.includes(this.searchKey) || announcement.title.includes(this.searchKey)){
          return true;
        }
        return false;
    })

    // for(var i = 0 ;  i < extraValue.length ; i++){
    //   filteredValues.push(extraValue[i])
    // }
    //console.log(value);
    
    return filteredValues;
  }

  }

}
