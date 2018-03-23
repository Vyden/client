import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { ClassesService } from '../../../services/classes/classes.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserInfo } from '../../../models/userInfo';
import { Course } from '../../../models/course';
import { QuizResponse } from '../../../models/quizResponse';
import { Subscription } from 'rxjs/Subscription';
import { QuizzesService } from '../../../services/quizzes/quizzes.service';
import { Observable } from 'rxjs/Rx';
import { Lecture } from '../../../models/lecture';
import { Quiz } from '../../../models/quiz';

@Component({
  selector: 'app-quiz-student',
  templateUrl: './quiz-student.component.html',
  styleUrls: ['./quiz-student.component.scss']
})
export class QuizStudentComponent implements OnInit, OnDestroy {

  public userInfo: UserInfo;
  public activeCourse: Course;
  public lectures: Lecture[];

  private authSubscription: Subscription;
  private classSubscription: Subscription;
  private lectureSubscription: Subscription;
  public quizResponses: Observable<QuizResponse[]>[];
  public quizInformation: Quiz[][] = [];

  constructor(private _authService: AuthService,
    private _classService: ClassesService,
    private _quizzesService: QuizzesService,
    private _firebase: AngularFireDatabase) { }

  ngOnInit() {
    /* Subscribe to user info */
    this.authSubscription = this._authService.currentUserInfo
    .subscribe((userInfo: UserInfo) => {
      this.userInfo = userInfo;
      });

    /* Subscribe to classes */
    this.classSubscription = this._classService.activeCourse
    .subscribe((course) => {
      this.activeCourse = course;

      if (this.userInfo && this.activeCourse) {
        this.quizResponses = [];
        //Get the list of all lectures for course
        this.lectureSubscription = this._firebase.object('Courses/' + this.activeCourse.id + '/lectures/').valueChanges()
        .subscribe((lectures: Object) => {
          this.lectures = [];
          //Create an array of observables with quizzes for each lecture
          Object.keys(lectures).forEach((lectureID: string, index: number) => {
            this.lectures.push(lectures[lectureID]);
            this.quizResponses[index] = this._quizzesService.getQuizResponseObservable(this.userInfo.UID, this.activeCourse.id, lectureID);
          })
        });
      }
    });
  }

  ngOnDestroy() {
    if (this.authSubscription) this.authSubscription.unsubscribe();
    if (this.classSubscription) this.classSubscription.unsubscribe();
    if (this.lectureSubscription) this.lectureSubscription.unsubscribe();
  }

}
