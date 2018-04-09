import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AuthService } from '../../services/auth/auth.service';
import { ClassesService } from '../../services/classes/classes.service';
import { Course } from '../../models/course';
import { UserInfo } from '../../models/userInfo';
import { Lecture } from '../../models/lecture';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LecturesService {

  /*private lectures: Course []
  private lecturesSource = new BehaviorSubject<Course []>([])
  private currentLectures = this.lecturesSource.asObservable()



  constructor(private _firebase: AngularFireDatabase) {
    this.currentLectures
      .subscribe((lectures: Course[]) =>{
        this.lectures = lectures
      })
   }

   public getFirebaseLectures(): Observable<Course []>{
     return this._firebase.list<Course>('courses').valueChanges()
   }*/


  private lectures: Lecture []
  private lecturesSource = new BehaviorSubject<Lecture []>([])
  private currentLectures = this.lecturesSource.asObservable()
  private currentCourse: Course;

  constructor(private _firebase: AngularFireDatabase,
    private _classesService: ClassesService) {
    this.currentLectures
      .subscribe((lectures: Lecture[]) =>{
        this.lectures = lectures
      })


   }

   ngOnInit() {

   }

   public getFirebaseLectures(): Observable<Lecture []>{
    this._classesService.activeCourse
    .subscribe((currentCourse: Course) => {
      this.currentCourse = currentCourse
    })
    // this._firebase.list()
    //  console.log("current Course is " + this.currentCourse.id);
    // console.log("In Firebase " + `Courses/${this.currentCourse.id}/lectures`)
     return this._firebase.list<Lecture>(`Courses/${this.currentCourse.id}/lectures`).valueChanges()
   }
}
