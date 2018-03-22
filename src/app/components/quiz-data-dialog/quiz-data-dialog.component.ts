import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';

/* Models */
import { QuizResponse } from '../../models/quizResponse';

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
  public options: any

  constructor(private _dialogRef: MatDialogRef<QuizDataDialogComponent>, private _af: AngularFireDatabase) {
    this.colHeaders = []

    this.options = {
      outsideClickDeselects: false
    }
  }

  ngOnInit() {
    this.getLectureQuizResponses()
  }

  private getLectureQuizResponses() {
    this._af.list(`Courses/${this.courseId}/lectureQuizResponses/${this.lectureId}`)
      .valueChanges()
      .subscribe((quizResponses: QuizResponse[]) => {
        console.log(quizResponses);
        this.hotData = quizResponses

        let colKeys = new Set()
        this.hotData.forEach(data => {
          Object.keys(data).forEach(key => colKeys.add(key))
        })

        colKeys.forEach(key => this.colHeaders.push(key))
        console.log(this.colHeaders);
      })
  }

}
