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
  private coordX: number
  private coordY: number
  public changelog: any[]

  public showSaveProgress: boolean

  constructor(private _dialogRef: MatDialogRef<QuizDataDialogComponent>,
    private _af: AngularFireDatabase,
    private _hotRegisterer: HotTableRegisterer) {
    this.columns = COLUMNS
    this.changelog = []
  }

  ngOnInit() {
    this.getLectureQuizResponses()
  }

  public saveChanges() {
    this.showSaveProgress = true

    this.changelog.forEach((change: any) => {
      let newValue = change.newValue
      let updateObj = {}

      if (change.colName == 'date') {
        newValue = (new Date(newValue)).getTime()
      } else if (change.colName == 'selection') {
        newValue = parseInt(newValue)
        updateObj['correct'] = -1
      }

      updateObj[change.colName] = newValue

      this._af.object(`Courses/${this.courseId}/lectureQuizResponses/${this.lectureId}/${change.rowData.id}`)
        .update(updateObj)
    })

    this.changelog = []
    this.showSaveProgress = false
  }

  public downloadCSV() {
    /* From:
     * https://stackoverflow.com/questions/8847766/how-to-convert-json-to-csv-format-and-store-in-a-variable
     */

    const items = this.hotData
    const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    const header = Object.keys(items[0])
    let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    csv.unshift(header.join(','))
    csv = csv.join('\r\n')

    this.downloadString(this.lectureId + '.csv', csv)
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
        this.changelog.push({
          rowData: this.hotData[row],
          row: row,
          colName: colName,
          oldValue: oldValue,
          newValue: newValue
        })
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
  }

  private downloadString(filename, text) {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

}
