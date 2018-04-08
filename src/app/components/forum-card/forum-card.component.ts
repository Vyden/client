import { Component, OnInit } from '@angular/core';

/* Services */
import { ThemeService } from '../../services/theme/theme.service';
import { ClassesService } from '../../services/classes/classes.service';
import { AuthService } from '../../services/auth/auth.service';

/* Models */
import { Course } from '../../models/course';
import { UserInfo } from '../../models/userInfo';
import { ForumQuestion, ForumAnswer } from '../../models/forum';

@Component({
  selector: 'app-forum-card',
  templateUrl: './forum-card.component.html',
  styleUrls: ['./forum-card.component.scss']
})
export class ForumCardComponent implements OnInit {

  /* Theme data */
  public themeClass: string

  /* User data */
  private userInfo: UserInfo

  /* Course data */
  public currentCourse: Course

  /* Forum data */
  public buildQuestion: ForumQuestion

  constructor(private _themeService: ThemeService,
    private _classesService: ClassesService,
    private _authService: AuthService) { }

  ngOnInit() {
    /* Listen for changes to theme */
    this._themeService.currentThemeClass
      .subscribe((themeClass: string) => {
        this.themeClass = themeClass
      })

    /* Listen for changes to course */
    this._classesService.activeCourse
      .subscribe((currentCourse: Course) => {
        this.currentCourse = currentCourse
      })

    /* Subscribe to user info */
    this._authService.currentUserInfo
      .subscribe((userInfo: UserInfo) => {
        this.userInfo = userInfo
      })
  }

  public createQuestion(isNote: boolean = false) {
    // Initialize new question
    let newQuestion = new ForumQuestion()
    newQuestion.author = this.userInfo.UID
    newQuestion.dateCreated = Date.now()
    newQuestion.text = null
    newQuestion.isNote = isNote

    this.buildQuestion = newQuestion
  }

}
