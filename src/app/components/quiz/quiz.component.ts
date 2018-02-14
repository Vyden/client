import { Component, OnInit, Input } from '@angular/core';
import { DoneTickComponent } from '../done-tick/done-tick.component';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  @Input() lectureTime: number

  public quizOptions: string[] = []
  public quizStartTime: number // Start time in seconds
  public quizMM: number
  public quizSS: number
  public quizName: string

  public newQuizMode: boolean

  constructor() {
    this.quizOptions.push(null)
    this.quizMM = 0
    this.quizSS = 0
    this.quizStartTime = 0
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

  public calculateQuizTime() {
    this.quizStartTime = Number(this.quizMM) * 60 + Number(this.quizSS)
    console.log(this.quizStartTime);
  }

  public calculateQuizTimeSlider($event: any) {
    this.quizStartTime = Number($event.value)
    this.quizMM = Math.floor(this.quizStartTime / 60)
    this.quizSS = this.quizStartTime % 60
  }

  public finishQuiz() {
    this.newQuizMode = false
  }

}
