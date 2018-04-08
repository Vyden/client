import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

/* Services */
import { ThemeService } from '../../services/theme/theme.service';
import { ClassesService } from '../../services/classes/classes.service';
import { AuthService } from '../../services/auth/auth.service';
import { DialogsService } from '../../services/dialogs/dialogs.service';

/* Models */
import { Course } from '../../models/course';
import { UserInfo } from '../../models/userInfo';
import { ForumQuestion, ForumAnswer } from '../../models/forum';
import { DialogButton, DialogOptions } from '../../models/dialogOptions';

@Component({
  selector: 'app-forum-card',
  templateUrl: './forum-card.component.html',
  styleUrls: ['./forum-card.component.scss']
})
export class ForumCardComponent implements OnInit {

  /* Theme data */
  public themeClass: string

  /* User data */
  public userInfo: UserInfo

  /* Course data */
  public currentCourse: Course

  /* Forum data */
  public buildQuestion: ForumQuestion
  public forumPosts: ForumQuestion[]

  constructor(private _themeService: ThemeService,
    private _classesService: ClassesService,
    private _authService: AuthService,
    private _dialogsService: DialogsService,
    private _af: AngularFireDatabase) { }

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
        this._af.list<ForumQuestion>(`Courses/${this.currentCourse.id}/forum`)
          .snapshotChanges()
          .subscribe((actions) => {
            this.forumPosts = []

            actions.forEach((action) => {
              let post: ForumQuestion = action.payload.val()

              // Get author UserInfo
              this._af.object<UserInfo>(`UserInfo/${post.author}`)
                .valueChanges()
                .subscribe((authorInfo: UserInfo) => {
                  post.author = authorInfo
                })

              // Get editor UserInfo
              if (post.editor) {
                this._af.object<UserInfo>(`UserInfo/${post.editor}`)
                  .valueChanges()
                  .subscribe((editorInfo: UserInfo) => {
                    post.editor = editorInfo
                  })
              }

              this.forumPosts.push(post)
            })
          })

      })

    /* Subscribe to user info */
    this._authService.currentUserInfo
      .subscribe((userInfo: UserInfo) => {
        this.userInfo = userInfo
      })
  }

  public createQuestion(isNote: boolean = false) {
    // Initialize new question
    let newQuestion: ForumQuestion = new ForumQuestion()
    newQuestion.author = this.userInfo.UID
    newQuestion.isNote = isNote

    if (newQuestion.isNote) {
      newQuestion.title = "New Note"
    }

    this.buildQuestion = newQuestion
  }

  public cancelQuestion() {
    const closeButton: DialogButton = {
      text: "NO",
      returnValue: false
    }

    const confirmButton: DialogButton = {
      text: 'YES',
      color: 'warn',
      returnValue: true
    }

    const dialogOptions: DialogOptions = {
      title: 'Cancel New Question',
      message: 'Are you sure you want to stop editing this question? This action cannot be undone.',
      type: 'danger',
      buttons: [confirmButton, closeButton]
    }

    let dialog = this._dialogsService.openMessageDialog(dialogOptions)
      .subscribe((res: any) => {
        if (res === true) {
          this.buildQuestion = null
        }
      })
  }

  public postQuestion(question: ForumQuestion) {
    if (!question) return

    if (!this.userInfo) {
      console.error('userInfo is not defined')
      return
    }

    if (!this.currentCourse) {
      console.error('currentCourse is not defined')
      return
    }

    const $key: string = this._af.list(`Courses/${this.currentCourse.id}/forum`)
      .push(question)
      .key

    this._af.object(`Courses/${this.currentCourse.id}/forum/${$key}`)
      .update({ UID: $key })

    this.buildQuestion = null
  }

  public getDate(date: number): string {
    return (new Date(date)).toDateString()
  }

  public getUser(userID: string): Observable<UserInfo> {
    console.log('Getting user: ', userID)
    return this._af.object<UserInfo>(`UserInfo/${userID}`)
      .valueChanges()
  }

}
