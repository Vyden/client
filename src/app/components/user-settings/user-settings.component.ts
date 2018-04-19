import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

/* rxjs */
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';

/* Models */
import { UserInfo } from '../../models/userInfo';
import { Course } from '../../models/course';
import { DialogOptions, DialogButton } from '../../models/dialogOptions';

/* Services */
import { ClassesService } from '../../services/classes/classes.service';
import { AuthService } from '../../services/auth/auth.service';
import { ThemeService } from '../../services/theme/theme.service';
import { DialogsService } from '../../services/dialogs/dialogs.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit, OnDestroy {

  /* User data */
  public userInfo: UserInfo
  public authState: any
  public myCourses: Course[]

  /* Models */
  public fullnameModel: Subject<string> = new Subject<string>()

  /* Progress data */
  public showNameProgress: boolean

    /* Theme data */
    private themeActive = false
    private initialThemeClass = 'default'

  constructor(private _authService: AuthService,
    private _classesService: ClassesService,
    private _themeService: ThemeService,
    private _dialogsService: DialogsService,
    private _af: AngularFireDatabase,
    private _afAuth: AngularFireAuth) { }

  ngOnInit() {
    /* Subscribe to changes to the authstate */
    this._authService.currentUserObservable
      .subscribe((user: any) => {
        // Allows page access only if the user is logged in
        if (!user)
          this._authService.checkLogin()
        else
          this.authState = user
        console.log(this.authState);
      })

    /* Subscribe to user info */
    this._authService.currentUserInfo
      .subscribe((userInfo: UserInfo) => {
        this.userInfo = userInfo
        console.log(this.userInfo);
        /* Subscribe to course list */
        if (this.userInfo && this.userInfo.courses) {
          this._af.list("Courses/").valueChanges()
            .subscribe((allCourses: Course[]) => {
              console.log('pulled courses');
              this.myCourses = []
              allCourses.forEach((course: Course) => {
                // Push to list if the user has this course
                if (this.userInfo.courses[course.id]) {
                  this.myCourses.push(course)
                }
              })
            })

        }
      })

    /* Listen to changes in fullname model */
    this.fullnameModel
      .debounceTime(500)
      .distinctUntilChanged()
      .subscribe((text: string) => {
        if (!text) return
        this.userInfo.fullName = text
        this.showNameProgress = false
        // Update info in firebase
        this._af.object("UserInfo/" + this.userInfo.UID)
          .update(this.userInfo)
      });

    /* Subsribe to changes in theme class */
    this._themeService.currentThemeClass
      .subscribe((themeClass: string) => {
        if (!this.themeActive) {
          this.themeActive = true
          this.initialThemeClass = themeClass
          this._themeService.changeThemeClass("indigo")
          console.log(this.initialThemeClass)
        }
      })
  }

  ngOnDestroy() {
    this._themeService.changeThemeClass(this.initialThemeClass.substring(0, this.initialThemeClass.indexOf("-theme")))
  }

  public removeCourse(course: Course) {
    const closeButton: DialogButton = {
      text: "CLOSE",
      icon: 'close',
      returnValue: false
    }

    const confirmButton: DialogButton = {
      text: 'DELETE',
      icon: 'delete',
      color: 'warn',
      returnValue: true
    }

    const dialogOptions: DialogOptions = {
      title: 'Delete Account',
      message: 'Are you sure you want to drop ' + course.title + '? This action cannot be undone.',
      type: 'danger',
      buttons: [confirmButton, closeButton]
    }

    let dialog = this._dialogsService.openMessageDialog(dialogOptions)
      .subscribe((res: any) => {
        if (res === true) {
          delete this.userInfo.courses[course.id];
          this._af.object(`UserInfo/${this.userInfo.UID}`)
            .update(this.userInfo)
        }
      })
  }

  public changePassword() {
    const closeButton: DialogButton = {
      text: "CLOSE",
      icon: 'close',
      returnValue: false
    }

    const confirmButton: DialogButton = {
      text: 'YES',
      icon: 'lock_outline',
      color: 'warn',
      returnValue: true
    }

    const dialogOptions: DialogOptions = {
      title: 'Delete Account',
      message: 'Are you sure you want to change your password?',
      type: 'danger',
      buttons: [confirmButton, closeButton]
    }

    let dialog = this._dialogsService.openMessageDialog(dialogOptions)
      .subscribe((res: any) => {
        if (res === true) {
          this._afAuth.auth.sendPasswordResetEmail(this.authState.email)
        }
      })
  }

  public updateEmail() {
    // this.authState.updateEmail('test@test.com')
    this._dialogsService.openChangeEmailDialog()
      .subscribe((res: any) => {
        console.log(res)
      })
  }

  /* Model change callbacks */
  public fullnameChanged(text: string) {
    this.fullnameModel.next(text)
  }

  public updateInstructor($event) {
    this._af.object(`UserInfo/${this.userInfo.UID}`)
      .update(this.userInfo)
  }

}
