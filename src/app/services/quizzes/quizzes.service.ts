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

  public getQuizResponses(UID: string, courseID: string, lectureID: string): any[] {
    let quizzes = [];
    this._firebase.list('Courses/' + courseID + '/userQuizResponses/' + UID).valueChanges()
      .subscribe((quizResponses: QuizResponse[]) => {
        quizzes = quizResponses.filter((quizResponse: QuizResponse) => {
          return quizResponse.lecture === lectureID;
        });
        console.log(quizzes);
    });
    // console.log(quizzes);
    return quizzes;
  }
}