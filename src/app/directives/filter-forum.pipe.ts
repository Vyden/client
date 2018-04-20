import { Pipe, PipeTransform } from '@angular/core';
import { ForumQuestion, ForumAnswer } from '../models/forum';

@Pipe({
  name: 'filterForum',
  pure: false
})
export class FilterForumPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value) return value
    if(!args) return value
    if(!args.length) return value

    let filtered = []

    value.forEach((forumQuestion: ForumQuestion) => {
      let testString = ""
      testString += forumQuestion.title
      testString += forumQuestion.text
      if(!forumQuestion.isNote && forumQuestion.answers && forumQuestion.answers[0]) {
        const forumAnswers: ForumAnswer [] = <ForumAnswer []>forumQuestion.answers
        forumAnswers.forEach((forumAnswer: ForumAnswer) => {
          testString += forumAnswer.text
        })
      }

      if(testString.indexOf(args) >= 0) {
        filtered.push(forumQuestion)
      }
    })

    return filtered
  }

}
