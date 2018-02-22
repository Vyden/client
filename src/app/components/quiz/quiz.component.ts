import { Component, OnInit, Input } from '@angular/core';
import { DoneTickComponent } from '../done-tick/done-tick.component';
import { LectureEditorService } from '../../services/lecture-editor/lecture-editor.service';
import { Quiz } from '../../models/quiz';
import { QuizItem } from '../../models/quizItem';
import { ItemType, TimelineItem } from '../../models/timelineItem';
import { FocusOnCreateDirective } from '../../directives/focus-on-create/focus-on-create.directive';
import { ClassesService } from '../../services/classes/classes.service';
import { Course } from '../../models/course';
import { Lecture } from '../../models/lecture';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  @Input() lectureTime: number
  
  public currentCourse: Course
  public currentLectureId: string
  public currentQuiz: Quiz

  public quizMM: number
  public quizSS: number
  public quizStartTime: number
  public quizName: string
  public newQuizMode: boolean
  public unsavedWork: boolean

  constructor(private _lectureEditorService: LectureEditorService,
    private _classesService: ClassesService) { }

  ngOnInit() {
    // subscribe to course changes
    this._classesService.activeCourse
      .subscribe((course: Course) => {
        this.currentCourse = course
      })

    // Subscribe to lecture changes
    this._lectureEditorService.currentLectureId
      .subscribe((lectureId: string) => {
        this.currentLectureId = lectureId
      })
  }

  public initQuiz() {
    this.unsavedWork = true

    this.currentQuiz = new Quiz()
    this.currentQuiz.correct = 0

    this.quizName = "New Quiz"
    this.newQuizMode = true
    this.currentQuiz.answers = [null]
    this.quizMM = 0
    this.quizSS = 5
    this.calculateQuizTime()
  }

  public addQuizOption() {
    if (this.currentQuiz.answers.length === 5) return
    this.currentQuiz.answers.push(null)
  }

  public removeQuizOption(index: number) {
    if (index - 1 < 0) this.currentQuiz.correct = 0
    else if (index == this.currentQuiz.answers.length - 1)--this.currentQuiz.correct

    this.currentQuiz.answers.splice(index, 1)
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
    this.currentQuiz.course = this.currentCourse.id
    this.currentQuiz.question = this.quizName
    const $key: string = this._lectureEditorService.publishQuiz(this.currentQuiz)
    console.log('key: ', $key);

    const quizItem: TimelineItem = new QuizItem()
    quizItem.lecture = this.currentLectureId
    quizItem.eventTime = this.quizStartTime
    quizItem.name = this.quizName
    quizItem.type = ItemType.QUIZ
    quizItem.resource = $key

    this._lectureEditorService.publishTimelineItem(quizItem)
    this.newQuizMode = false
    this.unsavedWork = false
  }

  public trackByIndex(index: number, value: number) {
    return index;
  }

}
