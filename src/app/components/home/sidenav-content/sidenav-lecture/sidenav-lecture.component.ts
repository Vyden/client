import { Component, OnInit } from '@angular/core';
import { ClassesService } from '../../../../services/classes/classes.service';
import { ThemeService } from '../../../../services/theme/theme.service';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { AuthService } from '../../../../services/auth/auth.service';
import { UserInfo } from '../../../../models/userInfo';
import { Course } from '../../../../models/course';

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

  constructor(private _classesService: ClassesService, private _themeService: ThemeService, private _authService: AuthService) { }

  ngOnInit() {
    this._classesService.activeCourse.subscribe((activeCourse: Course) => {
      this.activeCourse = activeCourse;
    }).unsubscribe();

    /* Subscribe for theme changes */
    this._themeService.currentThemeClass.subscribe((theme: string) => {
      this.themeClass = theme;
    });

    /* Subscribe to user info */
    this._authService.currentUserInfo
      .subscribe((userInfo: UserInfo) => {
        this.userInfo = userInfo;
    })
  }

  backToCourses() {
    this._classesService.selectCourse(null);
    this._themeService.changeThemeClass('default');
  }

}
