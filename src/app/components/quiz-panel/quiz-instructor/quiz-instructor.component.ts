import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { ClassesService } from '../../../services/classes/classes.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserInfo } from '../../../models/userInfo';
import { Course } from '../../../models/course';
import { QuizResponse } from '../../../models/quizResponse';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { Lecture } from '../../../models/lecture';
import { Quiz } from '../../../models/quiz';

@Component({
  selector: 'app-quiz-instructor',
  templateUrl: './quiz-instructor.component.html',
  styleUrls: ['./quiz-instructor.component.scss']
})
export class QuizInstructorComponent implements OnInit, OnDestroy {

  private userInfo: UserInfo;
  private activeCourse: Course;
  public lectures: Lecture[] = [];
  public quizResponses: Object;

  private authSubscription: Subscription;
  private classSubscription: Subscription;

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

          this._firebase.object('Courses/' + this.activeCourse.id + '/lectureQuizResponses/').valueChanges()
            .subscribe((lectures: Lecture[]) => {
              this.lectures = [];
              this.quizResponses = [];
              Object.keys(lectures).forEach((lectureID: string) => {
                this._firebase.object('Courses/' + this.activeCourse.id + '/lectures/' + lectureID).valueChanges()
                  .subscribe((lectureObj: Lecture) => {
                    this.lectures.push(lectureObj);
                  })

                this._firebase.list('Courses/' + this.activeCourse.id + '/lectureQuizResponses/' + lectureID).valueChanges()
                  .subscribe((quizResponses: QuizResponse[]) => {
                    this.quizResponses[lectureID] = quizResponses;
                  })
              })
            })

        }
      });

  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this.classSubscription.unsubscribe();
  }

}

