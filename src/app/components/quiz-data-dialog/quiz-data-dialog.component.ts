import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';
import { HotTableRegisterer } from '@handsontable/angular'

/* Models */
import { QuizResponse } from '../../models/quizResponse';
import { Quiz } from '../../models/quiz';
import { COLUMNS } from './columns'

@Component({
  selector: 'app-quiz-data-dialog',
  templateUrl: './quiz-data-dialog.component.html',
  styleUrls: ['./quiz-data-dialog.component.scss'],
  providers: [HotTableRegisterer]
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
  private instance: string = "hotInstance"
  public selectedValue: any
  public selectedCol: any
  private coordX: number;
  private coordY: number;

  constructor(private _dialogRef: MatDialogRef<QuizDataDialogComponent>,
    private _af: AngularFireDatabase,
    private _hotRegisterer: HotTableRegisterer) {
    this.columns = COLUMNS
  }

  ngOnInit() {
    this.getLectureQuizResponses()
  }

  private getLectureQuizResponses() {
    this._af.object(`Courses/${this.courseId}/lectureQuizResponses/${this.lectureId}`)
      .valueChanges()
      .subscribe((quizResponses: any) => {
        let parsedData: QuizResponse[] = []
        for (let responseId in quizResponses) {
          quizResponses[responseId]['id'] = responseId
          parsedData.push(quizResponses[responseId])
        }

        this.hotData = parsedData
        console.log(this.hotData);
        this.hotData.forEach((responseData: any) => {
          const quizObj: Quiz = responseData.quizObj
          delete responseData['quizObj']

          const date = new Date(responseData.date)
          responseData.date = date.toDateString()
          responseData.question = quizObj.question
          responseData.response = quizObj.answers[responseData.selection]
        })
      })
  }

  private changeValue($event) {
    if ($event.params[1] == "edit") {
      const row: number = $event.params[0][0][0]
      const colName: string = $event.params[0][0][1]
      const oldValue: any = $event.params[0][0][2]
      const newValue: any = $event.params[0][0][3]

      if (oldValue != newValue) {
        console.log(this.hotData[row], row, colName, oldValue, newValue)
      }
    }
  }

  private syncSelection() {
    const hot = this._hotRegisterer.getInstance(this.instance); // Do not remove this semicolon
    [this.coordX, this.coordY] = hot.getSelected()[0]
    const x = parseInt(this.coordX.toString(), 10)
    const y = parseInt(this.coordY.toString(), 10)

    this.selectedValue = hot.getDataAtCell(x, y)
    this.selectedCol = hot.getColHeader(y)
    console.log(this.selectedValue);
  }

}
