import { Component, OnInit, Input } from '@angular/core';
import { DoneTickComponent } from '../done-tick/done-tick.component';
import { LectureEditorService } from '../../services/lecture-editor/lecture-editor.service';
import { Quiz } from '../../models/quiz';
import { QuizItem } from '../../models/quizItem';
import { ItemType } from '../../models/timelineItem';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  @Input() lectureTime: number

  public currentQuiz: Quiz

  public quizMM: number
  public quizSS: number

  public newQuizMode: boolean

  constructor(private _lectureEditorService: LectureEditorService) { }

  ngOnInit() {
  }

  public initQuiz() {
    this.currentQuiz = new Quiz()
    this.currentQuiz.course = "Test course"
    this.currentQuiz.name = "New Quiz"
    this.currentQuiz.correct = 0

    this.newQuizMode = true
    this.currentQuiz.answers = [null]
    this.quizMM = 0
    this.quizSS = 5
    this.calculateQuizTime()
  }

  public addQuizOption() {
    this.currentQuiz.answers.push(null)
    console.log(this.currentQuiz);
  }

  public removeQuizOption(el: string) {
    console.log(el);
    this.currentQuiz.answers.splice(this.currentQuiz.answers.indexOf(el), 1)
  }

  public calculateQuizTime() {
    this.currentQuiz.time = Number(this.quizMM) * 60 + Number(this.quizSS)
    console.log(this.currentQuiz.time);
  }

  public calculateQuizTimeSlider($event: any) {
    this.currentQuiz.time = Number($event.value)
    this.quizMM = Math.floor(this.currentQuiz.time / 60)
    this.quizSS = this.currentQuiz.time % 60
  }

  public finishQuiz() {
    this.newQuizMode = false
  }

  public trackByIndex(index: number, value: number) {
    return index;
  }

}
