import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../../services/auth/auth.service';
import { UserInfo } from '../../models/userInfo';
import { Course } from '../../models/course';
import { FilterOptions } from '../../models/filter-options';
import { Subscription } from 'rxjs/Subscription';
import { PanelContentService } from '../panel-content/panel-content.service';

@Injectable()
export class ClassesService {

  //Active course is a course object with the active course
  private activeCourseSource = new BehaviorSubject<Course>(null);
  public activeCourse = this.activeCourseSource.asObservable();

  // Filter
  private currentFilterSource = new BehaviorSubject<FilterOptions>(null)
  public currentFilter = this.currentFilterSource.asObservable()

  public lectures: string[];

  private userInfo: UserInfo;
  private courseIDArray: string[] = [];
  private lectureSubscription: Subscription;

  constructor(private _firebase: AngularFireDatabase, 
    private _authService: AuthService,
    private _panelContentService: PanelContentService) {
    this._authService.currentUserInfo
      .subscribe((userInfo: UserInfo) => {
        this.userInfo = userInfo;
        this.courseIDArray = [];
        if (this.userInfo && this.userInfo.courses) {
          this.courseIDArray.push(...Object.keys(this.userInfo.courses));
        }
      })
  }

  //Enroll student in a course
  public addCourse(courseID: string) {
    const courseSub = this._firebase.object('Courses/' + courseID).valueChanges().subscribe((course: Course) => {
      //Make sure course is valid
      if (course) {
        //Check if user is already enrolled in course
        if (!this.courseIDArray.includes(courseID)) {
          //Push course to courseIDArray and update firebase
          this.courseIDArray.push(courseID);
          this._firebase.list('UserInfo/' + this.userInfo.UID + '/courses/' + courseID + '/' + course.title).push('React > Angular');
          this._firebase.list('Courses/' + courseID + '/students/' + this.userInfo.UID).push('Firebase is cancer');
        } else {
          alert('Already enrolled in course');
          console.log('fix message');
        }
      } else {
        alert('Invalid course ID');
        console.log('fix message');
      }
      courseSub.unsubscribe();
    });
  }

  //Returns an array of the course IDs of the courses that the user is enrolled in
  public getEnrolledCourses(): string[] {
    return this.courseIDArray;
  }

  //Called when the user selects a course
  public selectCourse(activeCourse: Course) {
    this.activeCourseSource.next(activeCourse);
    this._panelContentService.updatePanelContent('announcements');
  }

  public removeCourse(courseID: string) {
    this.courseIDArray.splice(this.courseIDArray.indexOf(courseID), 1);
    //Remove course from student
    this._firebase.list('UserInfo/' + this.userInfo.UID + '/courses/').set(courseID, {});
    //Remove student from course
    this._firebase.list('Courses/' + courseID + '/students/').set(this.userInfo.UID, {});
  }

  public changeFilter(newFilter: FilterOptions) {
    if (newFilter) localStorage.setItem('filter', JSON.stringify(newFilter))

    this.currentFilterSource.next(newFilter);
  }

}
