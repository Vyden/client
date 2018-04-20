import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { LecturesService } from '../../services/lectures/lectures.service';
import { AuthService } from '../../services/auth/auth.service';
import { ClassesService } from '../../services/classes/classes.service';
import { DialogsService } from '../../services/dialogs/dialogs.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { PanelContentService } from '../../services/panel-content/panel-content.service';
import { CreateCourseService } from '../../services/create-course/create-course.service';
import { Course } from '../../models/course';
import { Lecture } from '../../models/lecture';
import { UserInfo } from '../../models/userInfo';
import { AnnouncementOptions } from '../../models/announcementOptions';
import { LectureArray } from '../../models/lectureArray';
import { Observable } from 'rxjs/Observable';
import { FilterContentService } from '../../services/filter-content/filter-content.service'
import { ForumCardComponent } from '../forum-card/forum-card.component';
import { FilterLectureOptions } from '../../models/filter-lecture-options';
import {  } from '../../services/lectures/lectures.service'

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit {

  public themeClass: string
  public userInfo: UserInfo
  public currentCourse: Course
  public currentPanel: string
  public announcementOptions: AnnouncementOptions;
  public buttonTag: string
  public panelTitle: string

  public filterLectureOptions: FilterLectureOptions

  constructor(private _themeService: ThemeService,
    private _authService: AuthService,
    private _firebase: AngularFireDatabase,
    private _classesService: ClassesService,
    private _dialogsService: DialogsService,
    private _panelContentService: PanelContentService,
    private _createCourseService: CreateCourseService,
    private _filterContentService: FilterContentService,
    private _lectureService: LecturesService,
  ) { }

  ngOnInit() {


    if (!this.announcementOptions) {
      this.announcementOptions = new AnnouncementOptions();
    }

    /* Subscribe to changes to the user */
    this._authService.currentUserObservable
      .subscribe((user: any) => {

        // Allows page access only if the user is logged in
        this._authService.checkLogin()
      })

    /* Subscribe to user info */
    this._authService.currentUserInfo
      .subscribe((userInfo: UserInfo) => {
        this.userInfo = userInfo
      })

    this._themeService.currentThemeClass
      .subscribe((themeClass: string) => {
        this.themeClass = themeClass;
      })

    this._classesService.activeCourse
      .subscribe((currentCourse: Course) => {
        this.currentCourse = currentCourse
        if (currentCourse) {
          this.buttonTag = "announcement";
        }
      })


    this._panelContentService.panelContent.subscribe((currentPanel: string) => {
      this.currentPanel = currentPanel;
      // console.log(currentPanel);
      if (currentPanel === "announcements") {
        this.buttonTag = "announcement";
        this.panelTitle = 'announcements'
      } else if (currentPanel === "quizzes") {
        this.buttonTag = "quiz";
        this.panelTitle = 'quizzes'
      } else {
        this.buttonTag = "lecture";
        this.panelTitle = 'lectures'
      }
    })
  }

  openAnnouncement() {
    this.announcementOptions = new AnnouncementOptions();
    this._dialogsService
      .createAnnouncement(this.announcementOptions)
      .subscribe(res => {
        this.announcementOptions = res;
        if (res) {
          this._createCourseService.createAnnouncement(this.announcementOptions, this.currentCourse);
        }
        // console.log(this.announcementOptions.d);

      });

  }

  //Called when user types a new filter string
  updateFilter(event: Event) {
    const input = <HTMLInputElement>event.target;
    this._filterContentService.setFilterString(input.value);
  }

    public openFilterDialog() {
      if(!this.filterLectureOptions) this.filterLectureOptions = new FilterLectureOptions()

      this._dialogsService.openLectureFilterDialog(this.filterLectureOptions)
        .subscribe((res: any) => {
          if(res) {
            this._lectureService.changeFilter(this.filterLectureOptions)
            // console.log(this.filterLectureOptions)
          }
        })
    }

}