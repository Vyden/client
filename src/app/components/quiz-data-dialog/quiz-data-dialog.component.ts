import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';

/* Models */
import { QuizResponse } from '../../models/quizResponse';
import { Quiz } from '../../models/quiz';
import { COLUMNS } from './columns'

@Component({
  selector: 'app-quiz-data-dialog',
  templateUrl: './quiz-data-dialog.component.html',
  styleUrls: ['./quiz-data-dialog.component.scss']
})
export class QuizDataDialogComponent implements OnInit {

  /* Lecture Data */
  public courseId: string
  public lectureId: string

  /* Table Data */
  public hotData: any
  public colHeaders: string[]
  public columns: any[]
  public options: any

  constructor(private _dialogRef: MatDialogRef<QuizDataDialogComponent>, private _af: AngularFireDatabase) {
    this.columns = COLUMNS
  }

  ngOnInit() {
    this.getLectureQuizResponses()
  }

  private getLectureQuizResponses() {
    this._af.list(`Courses/${this.courseId}/lectureQuizResponses/${this.lectureId}`)
      .valueChanges()
      .subscribe((quizResponses: QuizResponse[]) => {
        this.hotData = quizResponses

        this.hotData.forEach((responseData: any) => {
          const quizObj: Quiz = responseData.quizObj
          console.log(quizObj);
          delete responseData['quizObj']

          const date = new Date(responseData.date)
          responseData.date = date.toDateString()
          responseData.question = quizObj.question
          responseData.response = quizObj.answers[responseData.selection]
        })
      })
  }

}
