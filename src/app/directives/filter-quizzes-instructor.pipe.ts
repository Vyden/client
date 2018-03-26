import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterQuizzesInstructor'
})
export class FilterQuizzesInstructorPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
