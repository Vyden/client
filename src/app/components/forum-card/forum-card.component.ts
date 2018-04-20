import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

/* Directives */
import { FilterForumPipe } from '../../directives/filter-forum.pipe';

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
  public editQuestion: ForumQuestion
  public forumPosts: ForumQuestion[]
  public isEditingQuestion: boolean

  public buildAnswer: ForumAnswer
  public editAnswer: ForumAnswer
  public isEditingAnswer: boolean

  public filterQuery: string

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
        if(!currentCourse) return

        this.currentCourse = currentCourse
        this._af.list<ForumQuestion>(`Courses/${this.currentCourse.id}/forum`)
          .snapshotChanges()
          .subscribe((actions) => {
            this.forumPosts = []

            actions.forEach((action) => {
              let post: ForumQuestion = action.payload.val()

              // Check if post is private and the user has permissions to view it
              if (post.isPrivate && post.author !== this.userInfo.UID && this.currentCourse.instructor !== this.userInfo.UID)
                return

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

              // Get answers
              this._af.list<string>(`Courses/${this.currentCourse.id}/forum/${post.UID}/answers`)
                .snapshotChanges()
                .subscribe((answerActions) => {
                  let postAnswers = <ForumAnswer[]>[]
                  let postAnswersMap = {}
                  answerActions.forEach((answerAction) => {
                    const answerID: string = answerAction.payload.val()
                    this._af.object<ForumAnswer>(`Courses/${this.currentCourse.id}/forumAnswers/${answerID}`)
                      .valueChanges()
                      .subscribe((answer: ForumAnswer) => {
                        // Get author UserInfo
                        this._af.object<UserInfo>(`UserInfo/${answer.author}`)
                          .valueChanges()
                          .subscribe((authorInfo: UserInfo) => {
                            answer.author = authorInfo

                            if (postAnswersMap[answer.UID]) {
                              // Answer already exists, so update it
                              postAnswersMap[answer.UID].author = answer.author
                            }
                          })

                        // Get editor UserInfo
                        if (answer.editor) {
                          this._af.object<UserInfo>(`UserInfo/${answer.editor}`)
                            .valueChanges()
                            .subscribe((editorInfo: UserInfo) => {
                              answer.editor = editorInfo

                              if (postAnswersMap[answer.UID]) {
                                // Answer already exists, so update it
                                postAnswersMap[answer.UID].editor = answer.editor
                              }
                            })
                        }

                        if (postAnswersMap[answer.UID]) {
                          // Answer already exists, so update it
                          postAnswersMap[answer.UID] = answer
                        } else {
                          // Answer is new, record it
                          postAnswersMap[answer.UID] = answer
                          postAnswers.push(answer)
                        }
                      })
                  })
                  post.answers = postAnswers
                })

              this.forumPosts.push(post)
            })

            this.forumPosts.sort((a: ForumQuestion, b: ForumQuestion) => {
              const keyA = new Date(a.dateCreated)
              const keyB = new Date(b.dateCreated)
              // Compare the 2 dates
              if (keyA < keyB) return 1;
              if (keyA > keyB) return -1;
              return 0;
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

  public createAnswer(parentQuestion: ForumQuestion) {
    // Initialize new answer
    let newAnswer: ForumAnswer = new ForumAnswer()
    newAnswer.author = this.userInfo.UID
    newAnswer.questionUID = parentQuestion.UID

    this.buildAnswer = newAnswer
  }

  public cancelAnswer() {
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
      message: 'Are you sure you want to stop editing this answer? This action cannot be undone.',
      type: 'danger',
      buttons: [confirmButton, closeButton]
    }

    let dialog = this._dialogsService.openMessageDialog(dialogOptions)
      .subscribe((res: any) => {
        if (res === true) {
          this.buildAnswer = null
        }
      })
  }

  public postAnswer(answer: ForumAnswer) {
    if (!answer) return

    if (!this.userInfo) {
      console.error('userInfo is not defined')
      return
    }

    if (!this.currentCourse) {
      console.error('currentCourse is not defined')
      return
    }

    const $key: string = this._af.list(`Courses/${this.currentCourse.id}/forumAnswers`)
      .push(answer)
      .key

    this._af.object(`Courses/${this.currentCourse.id}/forumAnswers/${$key}`)
      .update({ UID: $key })

    this._af.list(`Courses/${this.currentCourse.id}/forum/${answer.questionUID}/answers`)
      .push($key)

    this.buildAnswer = null
  }

  public getDate(date: number): string {
    return (new Date(date)).toDateString()
  }

  public getUser(userID: string): Observable<UserInfo> {
    return this._af.object<UserInfo>(`UserInfo/${userID}`)
      .valueChanges()
  }

  public editQuestionStart(question: ForumQuestion) {
    this.isEditingQuestion = true
    this.editQuestion = question
  }

  public editQuestionDone(question: ForumQuestion) {
    this.isEditingQuestion = false

    this._af.object(`Courses/${this.currentCourse.id}/forum/${question.UID}`)
      .update({
        title: question.title,
        text: question.text,
        dateModified: Date.now(),
        editor: this.userInfo.UID
      })
  }

  public editAnswerStart(answer: ForumAnswer) {
    this.isEditingAnswer = true
    this.editAnswer = answer
  }

  public editAnswerDone(answer: ForumAnswer) {
    this.isEditingAnswer = false

    this._af.object(`Courses/${this.currentCourse.id}/forumAnswers/${answer.UID}`)
      .update({
        text: answer.text,
        dateModified: Date.now(),
        editor: this.userInfo.UID
      })
  }

  public parseLineBreaks(text: string): string {
    if(!text) return text
    return text.replace(/\n/g, "<br>")
  }

}
