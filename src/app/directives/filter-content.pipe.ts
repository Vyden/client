import { Pipe, PipeTransform } from '@angular/core';
import { Lecture } from '../models/lecture';

@Pipe({
  name: 'filterContent'
})
export class FilterContentPipe implements PipeTransform {

  transform(value: Lecture[], filterString: string): any {
    if (filterString.length === 0) return value;
    return value.filter((lecture: Lecture) => {
      return lecture.title.toLowerCase().includes(filterString.toLowerCase());
    })
  }

}
