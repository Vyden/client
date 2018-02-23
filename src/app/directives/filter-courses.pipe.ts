import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCourses'
})
export class FilterCoursesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
