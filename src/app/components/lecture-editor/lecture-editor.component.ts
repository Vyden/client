import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { DoneTickComponent } from '../done-tick/done-tick.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-lecture-editor',
  templateUrl: './lecture-editor.component.html',
  styleUrls: ['./lecture-editor.component.scss']
})
export class LectureEditorComponent implements OnInit, OnDestroy {

  public quizOptions: string[] = []
  public quizStartTime: number // Start time in seconds
  public quizMM: number
  public quizSS: number

  public newQuizMode: boolean

  public lectureEndTime: number // End time in seconds

  /* Quiz Stepper Properties */
  firstGroup: FormGroup

  constructor(private _themeService: ThemeService) {
    this.quizOptions.push(null)
    this.quizMM = 0
    this.quizSS = 0
    this.quizStartTime = 0
    this.lectureEndTime = 3000
  }

  ngOnInit() {
    this._themeService.changeThemeClass("deep-purple");
  }

  ngOnDestroy() {
    this._themeService.changeThemeClass("default");
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

}
