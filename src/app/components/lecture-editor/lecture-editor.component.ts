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

  public quizOptions: string [] = []

  public newQuizMode: boolean

  /* Quiz Stepper Properties */
  firstGroup: FormGroup

  constructor(private _themeService: ThemeService) {
    this.quizOptions.push(null)
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

}
