import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Lecture } from '../../models/lecture';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LecturesService {

  private lectures: Lecture []
  private lecturesSource = new BehaviorSubject<Lecture []>([])
  private currentLectures = this.lecturesSource.asObservable()



  constructor(private _firebase: AngularFireDatabase) {
    this.currentLectures
      .subscribe((lectures: Lecture[]) =>{
        this.lectures = lectures
      })
   }

   public getFirebaseLectures(): Observable<Lecture []>{
     return this._firebase.list<Lecture>('tempquizzes').valueChanges()
   }

}
