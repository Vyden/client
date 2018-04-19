import { Component, OnInit } from '@angular/core';
import { LecturesService } from '../../services/lectures/lectures.service';
import { AuthService } from '../../services/auth/auth.service';
import { ClassesService } from '../../services/classes/classes.service';
import { FilterContentService } from '../../services/filter-content/filter-content.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Course } from '../../models/course';
import { Lecture } from '../../models/lecture';
import { UserInfo } from '../../models/userInfo';
import { Announcement } from '../../models/announcement';
import { FilterAnnouncementsPipe } from '../../directives/filter-announcements.pipe';
import { TimelineItem } from '../../models/timelineItem';

@Component({
  selector: 'app-general-announcement-card',
  templateUrl: './general-announcement-card.component.html',
  styleUrls: ['./general-announcement-card.component.scss']
})
export class GeneralAnnouncementCardComponent implements OnInit {

  public userInfo: UserInfo;
  public currentCourse: Course;
  public enrolledCourse: string[];
  public courses: Course[];
  public announcements: Observable<Announcement[]>
  public announcementList: Announcement[] = [];
  public arrangedAnnouncements: Announcement[] = [];
  public searchString: string;

  constructor(private _lecturesService: LecturesService,
    private _authService: AuthService,
    private _firebase: AngularFireDatabase,
    private _classesService: ClassesService,
    private _filterContentService: FilterContentService) { }

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

        let courseIDList = this._classesService.getEnrolledCourses();
        this.courses = [];
        this.arrangedAnnouncements = [];
        courseIDList.forEach((courseID: string) => {
          this._firebase.object('Courses/' + courseID).valueChanges().subscribe((course: Course) => {
            let found = false;
            this.courses.forEach((existingCourse: Course) => {
              if (existingCourse.id === course.id) found = true;
            })
            if (!found) {
              this.courses.push(course);
              this.announcements = this._firebase.list<Announcement>(`Courses/${course.id}/announcements`).valueChanges();
            this.announcements.subscribe(res => {
              this.announcementList = this.announcementList.concat(res);
              for (var i = 0 ; i < res.length ; i++){
                this.arrangedAnnouncements.push(res[i]);
              }
            })
            }
          });
        })


        // console.log('outside length ', this.announcementList.length)
        // this.arrangedAnnouncements = this.announcementList;
        // // if(this.courses.length > 0){
        //   for(var i = 0 ; i  < this.courses.length ; i++){

        //     this.announcements = this._firebase.list<Announcement>(`Courses/${this.courses[i].id}/announcements`).valueChanges();
        //       console.log('announcements ' , this.announcements)
        //     this.announcements.subscribe(res => {
        //       console.log('subscribing ' , res);
        //       this.announcementList = this.announcementList.concat(res);
        //     })
        //   }
        //   console.log('announcementlist ' , this.announcementList);
        // // }
      })



      

    this._classesService.activeCourse
      .subscribe((currentCourse: Course) => {
        this.currentCourse = currentCourse

    this._filterContentService.filterContent
      .subscribe((searchString: string) => {
        this.searchString = searchString;
        console.log(this.searchString);
      })

        /*if(currentCourse){
          this.announcements = this._firebase.list<Announcement>(`Courses/${this.currentCourse.id}/announcements`).valueChanges();
          
          this.announcements.subscribe(res => {
            this.announcementList = res;
            // console.log(this.announcementList);
            this.arrangedAnnouncements = [];
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
          
            
        }*/
      })
  }

  convertString(date: number): string {
    let stringDate = String(new Date(date));

    return stringDate;
  }

  getCourseName(courseID: string): any {
    let courseData;
    //= this._firebase.object(`Courses/${courseID}/title`).valueChanges()
    // console.log('courses ', this.courses)
    for (var i = 0; i < this.courses.length; i++) {
      if (this.courses[i].id === courseID) {
        courseData = this.courses[i].title;
      }
    }
    return courseData;

  }

}
