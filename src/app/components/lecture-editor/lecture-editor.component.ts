import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-lecture-editor',
  templateUrl: './lecture-editor.component.html',
  styleUrls: ['./lecture-editor.component.scss']
})
export class LectureEditorComponent implements OnInit {

  public quizOptions: string [] = []

  public newQuizMode: boolean

  constructor() {
    this.quizOptions.push(null)
  }

  ngOnInit() {
  }

  public initQuiz() {
    this.newQuizMode = true
    
  }

  public addQuizOption() {
    this.quizOptions.push(null)
  }

  public removeQuizOption(el: string) {
    console.log(el);
    this.quizOptions.splice(this.quizOptions.indexOf(el), 1)
  }

}
