import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Course } from '../../models/course';


@Injectable()
export class CreateCourseService {

  

  constructor(private _firebase: AngularFireDatabase) { }

  public createCourse(title: string): string{

    const newCourse: Course = {
      instructor: "Shifu Gustavo",
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

}
