import { Component, OnInit } from '@angular/core';
import { ClassesService } from '../../../../services/classes/classes.service';
import { ThemeService } from '../../../../services/theme/theme.service';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { AuthService } from '../../../../services/auth/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserInfo } from '../../../../models/userInfo';
import { Course } from '../../../../models/course';
import { PanelContentService } from '../../../../services/panel-content/panel-content.service';
import { DialogsService } from '../../../../services/dialogs/dialogs.service';
import { DialogButton, DialogOptions } from '../../../../models/dialogOptions'

@Component({
  selector: 'app-sidenav-lecture',
  templateUrl: './sidenav-lecture.component.html',
  styleUrls: ['./sidenav-lecture.component.scss'],
  animations: [
    trigger('enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('250ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('250ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ],
    ),
  ],
})
export class SidenavLectureComponent implements OnInit {

  activeCourse: Course;
  public themeClass: string;
  public themes: string[][] = this._themeService.getThemes();
  public hover: boolean[] = [];

  public userInfo: UserInfo;

  constructor(private _classesService: ClassesService,
    private _themeService: ThemeService,
    private _authService: AuthService,
    private _dialogsService: DialogsService,
    private _firebase: AngularFireDatabase,
    private _panelContent: PanelContentService) { }

  ngOnInit() {
    this._classesService.activeCourse.subscribe((activeCourse: Course) => {
      this.activeCourse = activeCourse;
    }).unsubscribe();

    /* Subscribe for theme changes */
    this._themeService.currentThemeClass.subscribe((theme: string) => {
      this.themeClass = theme;
    }).unsubscribe();

    /* Subscribe to user info */
    this._authService.currentUserInfo
      .subscribe((userInfo: UserInfo) => {
        this.userInfo = userInfo;
      })
  }

  backToCourses() {
    this._panelContent.updatePanelContent('announcements');
    this._classesService.selectCourse(null);
    this._themeService.changeThemeClass('default');
  }

  removeCourse() {
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
      title: 'Remove Course',
      message: 'Are you sure you want to drop ' + this.activeCourse.title + '? This action cannot be undone.',
      type: 'danger',
      buttons: [confirmButton, closeButton]
    }

    let dialog = this._dialogsService.openMessageDialog(dialogOptions)
      .subscribe((res: any) => {
        if (res === true) {
          this._classesService.removeCourse(this.activeCourse.id);
          this.backToCourses();
        }
      })
  }

  switchPanel(event: Event) {
    const button = <HTMLButtonElement>event.target;
    const panel = button.dataset.section;
    this._panelContent.updatePanelContent(panel);
  }
}
