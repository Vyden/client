import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthService } from '../../services/auth/auth.service';
import { Observable } from 'rxjs/Observable';
import { Course } from '../../models/course';
import { UserInfo } from '../../models/userInfo';
import { AnnouncementOptions } from '../../models/announcementOptions';
import { Announcement } from '../../models/announcement';
// import { create } from 'domain';




@Injectable()
export class CreateCourseService {

  userInfo: UserInfo

  constructor(private _firebase: AngularFireDatabase,
    private _authService: AuthService) {
      this._authService.currentUserInfo
    .subscribe((userInfo: UserInfo) => {
      this.userInfo = userInfo
    })
     }

  public createCourse(title: string): string{

    const newCourse: Course = {
      instructor: this.userInfo.UID,
      title: title,
      students: [],
      lectures: [],
      studentQuizResponses: [],
      lectureQuizResponses: []
    }

    const key: string =  this._firebase.list(`Courses`)
      .push(newCourse)
      .key

    this._firebase.object(`Courses/${key}`)
    .update({id: key})  


    return key;
  }

  public createAnnouncement(announcementOptions : AnnouncementOptions, currentCourse: Course){
    const newAnnouncement = new Announcement();
    newAnnouncement.title = announcementOptions.title;
    newAnnouncement.text =  announcementOptions.description;
    newAnnouncement.course = currentCourse.id;
    newAnnouncement.pinned = announcementOptions.checkPost;
    newAnnouncement.date = Date.now();
    const key: string =  this._firebase.list(`Courses/${currentCourse.id}/announcements`)
    .push(newAnnouncement)
    .key

    this._firebase.object(`Courses/${currentCourse.id}/announcements/${key}`)
    .update({id : key})
    // console.log(newAnnouncement);
  }

}
