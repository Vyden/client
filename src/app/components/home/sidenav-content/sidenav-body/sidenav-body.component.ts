import { Component, OnInit } from '@angular/core';
import { ClassesService } from '../../../../services/classes/classes.service';
import { ThemeService } from '../../../../services/theme/theme.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserInfo } from '../../../../models/userInfo';
import { Course } from '../../../../models/course';
import { Subscription } from 'rxjs/Subscription';
import { FilterCoursesPipe } from '../../../../directives/filter-courses.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav-body',
  templateUrl: './sidenav-body.component.html',
  styleUrls: ['./sidenav-body.component.scss']
})
export class SidenavBodyComponent implements OnInit {

  public themeClass: string = "default-theme";
  public themes: string[][] = this._themeService.getThemes();
  public hover: boolean[] = [];

  public userInfo: UserInfo;
  public courses: Course[] = [];
  private authSub: Subscription;
  public currentCourse: Course;
  public courseCheck: boolean[] = [];

  constructor(private _classesService: ClassesService,
    private _themeService: ThemeService,
    private _authService: AuthService,
    private _firebase: AngularFireDatabase,
    private _router: Router) { }

  ngOnInit() {
    /* Subscribe for theme changes */
    this._themeService.currentThemeClass.subscribe((theme: string) => {
			this.themeClass = theme;
    });

    /* Subscribe to user info */
    this.authSub = this._authService.currentUserInfo
      .subscribe((userInfo: UserInfo) => {
        this.userInfo = userInfo;

        let courseIDList = this._classesService.getEnrolledCourses();
        this.courses = [];
        courseIDList.forEach((courseID: string) => {
          this._firebase.object('Courses/' + courseID).valueChanges().subscribe((course: Course) => {
            let found = false;
            this.courses.forEach((existingCourse: Course) => {
              if (existingCourse.id === course.id) found = true;
            })
            if (!found) {
              this.courses.push(course);
            }
          });
        })
      });



    this._classesService.activeCourse
      .subscribe((currentCourse: Course) => {
        this.currentCourse = currentCourse;
      })
  }

  //Takes index of button as parameter
  //Returns color for button
  public getButtonColor(index: number): string {
    return this.themes[index % this.themes.length][1];
  }

  //Called when a class button is clicked
  //Changes the theme of the page and changes sidenav to lecture sidenav view
  public navigateToCourse(index: number) {
    this.authSub.unsubscribe();
    this._themeService.changeThemeClass(this.themes[index][0]);
    this._classesService.selectCourse(this.courses[index]);
  }
}
