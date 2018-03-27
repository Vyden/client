import { Pipe, PipeTransform } from '@angular/core';
import { QuizResponse } from '../models/quizResponse';

@Pipe({
  name: 'filterQuizzesStudent'
})
export class FilterQuizzesStudentPipe implements PipeTransform {

  transform(value: QuizResponse[], filterOption: string): any {

    switch (filterOption) {
      case 'all':
        return value;
      case 'correct':
        return value.filter((response: QuizResponse) => {
          return response.correct;
        });
      case 'incorrect':
      return value.filter((response: QuizResponse) => {
        return !response.correct;
      });
      case 'none':
        return []
    }

    return null;
  }

}
