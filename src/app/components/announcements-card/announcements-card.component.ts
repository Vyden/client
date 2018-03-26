import { Component, OnInit } from '@angular/core';
import { LecturesService } from '../../services/lectures/lectures.service';
import { AuthService } from '../../services/auth/auth.service';
import { ClassesService } from '../../services/classes/classes.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Course } from '../../models/course';
import { Lecture } from '../../models/lecture';
import { UserInfo } from '../../models/userInfo';
import { Announcement } from '../../models/announcement';
import { TimelineItem } from '../../models/timelineItem';

@Component({
  selector: 'app-announcements-card',
  templateUrl: './announcements-card.component.html',
  styleUrls: ['./announcements-card.component.scss']
})
export class AnnouncementsCardComponent implements OnInit {


  public userInfo: UserInfo;
  public currentCourse: Course;

  public announcements: Observable<Announcement []>
  public announcementList : Announcement[] = [];
  public arrangedAnnouncements: Announcement[] = [];

  constructor(private _lecturesService: LecturesService,
    private _authService: AuthService,
    private _firebase: AngularFireDatabase,
    private _classesService: ClassesService) { }

  ngOnInit() {
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

    this._classesService.activeCourse
    .subscribe((currentCourse: Course) => {
      this.currentCourse = currentCourse

      if(currentCourse){
        this.announcements = this._firebase.list<Announcement>(`Courses/${this.currentCourse.id}/announcements`).valueChanges();
        
        this.announcements.subscribe(res => {
          this.announcementList = res;
          console.log(this.announcementList);
          for(var i = this.announcementList.length-1 ; i >= 0  ; i--){
            if(this.announcementList[i].pinned === true){
              this.arrangedAnnouncements.push(this.announcementList[i]);
              this.announcementList.splice(i,1);
            }
          }
          for(var i = this.announcementList.length-1 ; i >= 0  ; i--){
            this.arrangedAnnouncements.push(this.announcementList[i]);
          }
        })
        // this.lectures = this._lecturesService.getFirebaseLectures()
        // this.announcements = this.
      //   this.lectures.subscribe(res => {
      //       this.lectureList = res;
            
      //     });
      // this.getInstructorName();
          
      }
    })
  }

  convertString(date: number): string{
    let stringDate = String(new Date(date));

   return stringDate;
 }

//  public courseData: any;
  getCourseName(courseID: string): any{
    let courseData = this._firebase.object(`Courses/${courseID}/title`).valueChanges()

    // let courseName;

    // console.log(courseData);
    // courseData.subscribe(res => {
    //   courseName = res;
    // })
    // console.log(courseName);

    return courseData;
  }

}
