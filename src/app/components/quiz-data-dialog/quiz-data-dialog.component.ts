import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-quiz-data-dialog',
  templateUrl: './quiz-data-dialog.component.html',
  styleUrls: ['./quiz-data-dialog.component.scss']
})
export class QuizDataDialogComponent implements OnInit {

  public courseId: string
  public lectureId: string

  constructor(private _dialogRef: MatDialogRef<QuizDataDialogComponent>, private _af: AngularFireDatabase) { }

  ngOnInit() {
    this.getLectureQuizResponses()
  }

  private getLectureQuizResponses() {
    this._af.list(`Courses/${this.courseId}/lectureQuizResponses/${this.lectureId}`)
      .valueChanges()
      .subscribe((res: any) => {
        console.log(res);
      })
  }

}
