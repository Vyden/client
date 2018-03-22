import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase } from 'angularfire2/database';
import { ClassesService } from '../../services/classes/classes.service';
import { UserInfo } from '../../models/userInfo';
import { Course } from '../../models/course';
import { QuizResponse } from '../../models/quizResponse';

@Injectable()
export class QuizzesService {

  //Active course is a course object with the active course
  private quizResponsesSource = new BehaviorSubject<QuizResponse[]>(null);
  public quizResponses = this.quizResponsesSource.asObservable();

  constructor(private _firebase: AngularFireDatabase) {}

  public getQuizResponseObservable(UID: string, courseID: string, lectureID: string): Observable<QuizResponse[]> {
    this._firebase.object('Courses/' + courseID + '/userQuizResponses/' + UID).valueChanges().subscribe((quizResponses: Object) => {
      let quizzes = [];
      Object.keys(quizResponses).forEach((quizResponseID: string) => {
        if (quizResponses[quizResponseID].lecture === lectureID) {
          quizzes.push(quizResponses[quizResponseID]);
        }
      })
      this.quizResponsesSource.next(quizzes);
    });
    return this.quizResponsesSource;
  }
}