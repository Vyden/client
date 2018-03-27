import { Pipe, PipeTransform } from '@angular/core';
import { Lecture } from '../models/lecture';

@Pipe({
  name: 'filterQuizzesInstructor'
})
export class FilterQuizzesInstructorPipe implements PipeTransform {

  transform(value: Lecture[], newestFirst: boolean): any {

    if (newestFirst) {
      return value.sort((lectureA: Lecture, lectureB: Lecture) => {
        return lectureB.date - lectureA.date;
      })
    } else {
      console.log('oldest first');
      return value.sort((lectureA: Lecture, lectureB: Lecture) => {
        return lectureA.date - lectureB.date;
      })
    }
  }

}
