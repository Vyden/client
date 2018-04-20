import { Pipe, PipeTransform } from '@angular/core';
import { QuizResponse } from '../models/quizResponse';

@Pipe({
  name: 'filterQuizResponses'
})
export class FilterQuizResponsesPipe implements PipeTransform {

  transform(value: QuizResponse[], args?: any): any {

    if(!value) return value

    let existingQuizzes: string[] = [];

    return value.filter((quizResponse) => {
      if (existingQuizzes.includes(quizResponse.quiz)) {
        return false;
      } else {
        existingQuizzes.push(quizResponse.quiz);
        return true;
      }
    })

  }

}
