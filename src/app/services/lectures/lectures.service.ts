import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Course } from '../../models/course';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LecturesService {

  private lectures: Course []
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
   }

}
