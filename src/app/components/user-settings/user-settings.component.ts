import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

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

  constructor(private _authService: AuthService,
    private _classesService: ClassesService,
    private _themeService: ThemeService,
    private _dialogsService: DialogsService,
    private _af: AngularFireDatabase) { }

  ngOnInit() {
    /* Subscribe to changes to the authstate */
    this._authService.currentUserObservable
      .subscribe((user: any) => {
        // Allows page access only if the user is logged in
        this._authService.checkLogin()
        this.authState = user
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

    /* Change to indigo theme for this page */
    this._themeService.changeThemeClass("indigo");
  }

  ngOnDestroy() {
    this._themeService.changeThemeClass("default");
  }

  public removeCourse(course: Course) {
    delete this.userInfo.courses[course.id];

    this._af.object(`UserInfo/${this.userInfo.UID}`)
      .update(this.userInfo)
  }

  public testDialog() {
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
      message: 'Are you sure you want to do this? This action cannot be undone.',
      type: 'danger',
      buttons: [ confirmButton, closeButton ]
    }

    this._dialogsService.openMessageDialog(dialogOptions)
      .subscribe((res: any) => {
        console.log(res);
      })
  }

}
