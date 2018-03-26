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
  public lectures: Lecture[] = [];

  private authSubscription: Subscription;
  private classSubscription: Subscription;
  private lectureSubscription: Subscription;
  public quizResponses: Object;

  constructor(private _authService: AuthService,
    private _classService: ClassesService,
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

          //Get the list of all lectures for course
          this.lectureSubscription = this._firebase.list('Courses/' + this.activeCourse.id + '/lectures/').valueChanges()
            .subscribe((lectures: Lecture[]) => {
              this.lectures = [];
              this.quizResponses = [];
              lectures.forEach((lecture: Lecture) => {
                this.lectures.push(lecture);
                this._firebase.list('Courses/' + this.activeCourse.id + '/userQuizResponses/' + this.userInfo.UID).valueChanges()
                  .subscribe((quizResponses: QuizResponse[]) => {
                    this.quizResponses[lecture.id] = quizResponses.filter((quizResponse: QuizResponse) => {
                      return quizResponse.lecture === lecture.id;
                    });
                  });

              });
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
