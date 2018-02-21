import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from '../../services/auth/auth.service';
import { UserInfo } from '../../models/userInfo';
import { Course } from '../../models/course'

@Injectable()
export class ClassesService {

  //Active class is a string array
  //First element in activeClassSource is courseID
  //Second element in activeClassSource is course name
  private activeClassSource = new BehaviorSubject<string[]>(null);
  public activeClass = this.activeClassSource.asObservable();

  private userInfo: UserInfo;
  private courseIDArray: string[] = [];

  constructor(private _firebase: AngularFireDatabase, private _authService: AuthService) {
    this._authService.currentUserInfo
      .subscribe((userInfo: UserInfo) => {
        this.userInfo = userInfo;
        if (this.userInfo && this.userInfo.courses) {
          this.courseIDArray = [];
          this.courseIDArray.push(...this.userInfo.courses);
        }
    })
  }

  //Enroll student in a course
  public addCourse(courseID: string) {
    this._firebase.object('Courses/' + courseID).valueChanges().subscribe((course: Course) => {
      //Make sure course is valid
      if (course) {
        //Check if user is already enrolled in course
        if (!this.courseIDArray.includes(courseID)) {
          //Push course to courseIDArray and update firebase
          this.courseIDArray.push(courseID);
          this._firebase.list('UserInfo/' + this.userInfo.UID).update('courses', this.courseIDArray);
          this._firebase.list('Courses/' + courseID + '/students/' + this.userInfo.UID).push('Firebase is cancer');
        }
      }
    })
  }

  //Get the courses the user in currently enrolled in
  public getEnrolledCourses(): string[] {
    return this.courseIDArray;
  }

  //Called when the user selects a course
  public selectCourse(activeClass: string[]) {
    this.activeClassSource.next(activeClass);
  }
}
