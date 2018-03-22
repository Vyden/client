import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-quiz-data-dialog',
  templateUrl: './quiz-data-dialog.component.html',
  styleUrls: ['./quiz-data-dialog.component.scss']
})
export class QuizDataDialogComponent implements OnInit {

  public courseId: string
  public lectureId: string

  constructor(private _dialogRef: MatDialogRef<QuizDataDialogComponent>) { }

  ngOnInit() {
  }

}
