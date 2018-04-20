import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { ClassesService } from '../../../services/classes/classes.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { UserInfo } from '../../../models/userInfo';
import { Course } from '../../../models/course';
import { QuizResponse } from '../../../models/quizResponse';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Rx';
import { Lecture } from '../../../models/lecture';
import { Quiz } from '../../../models/quiz';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FilterQuizzesInstructorPipe } from '../../../directives/filter-quizzes-instructor.pipe';

@Component({
  selector: 'app-quiz-instructor',
  templateUrl: './quiz-instructor.component.html',
  styleUrls: ['./quiz-instructor.component.scss']
})
export class QuizInstructorComponent implements OnInit, OnDestroy {

  private userInfo: UserInfo;
  public activeCourse: Course;
  public lectures: Lecture[] = [];
  public quizResponses: Object;
  public quizTotals: Object;
  public newestFirst: boolean = false;

  private authSubscription: Subscription;
  private classSubscription: Subscription;
  private lectureSubscription: Subscription;

  // data pulled from firebase
  single = [
    {
      "name": "a",
      "value": 50
    },
    {
      "name": "b",
      "value": 87
    },
    {
      "name": "c",
      "value": 67
    },
    {
      "name": "d",
      "value": 100
    }
  ];

  // changing the size of graph
  view: any[] = [400, 200];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Answer Choice';
  showYAxisLabel = true;
  yAxisLabel = 'Number of Students';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };


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
              this.quizTotals = [];

              if(!lectures) return

              Object.keys(lectures).forEach((lectureID: string) => {
                  this.lectureSubscription = this._firebase.object('Courses/' + this.activeCourse.id + '/lectures/' + lectureID).valueChanges()
                  .subscribe((lectureObj: Lecture) => {
                    this.lectures.push(lectureObj);
                  })

                this._firebase.list('Courses/' + this.activeCourse.id + '/lectureQuizResponses/' + lectureID).valueChanges()
                  .subscribe((quizResponses: QuizResponse[]) => {
                    this.quizResponses[lectureID] = quizResponses;
                    quizResponses.forEach((quiz: QuizResponse) => {
                      const quizID = quiz.quiz;
                      if (this.quizTotals[quizID]) {
                        this.quizTotals[quizID][quiz.selection]['value']++;
                      } else {
                        this.quizTotals[quizID] = [
                          {
                            "name": "a",
                            "value": 0
                          },
                          {
                            "name": "b",
                            "value": 0
                          },
                          {
                            "name": "c",
                            "value": 0
                          },
                          {
                            "name": "d",
                            "value": 0
                          }
                        ]
                        this.quizTotals[quizID][quiz.selection]['value']++;
                      }
                    })
                  })
              })
            })

        }
      });

    if(this.lectureSubscription) {
      this.lectureSubscription.unsubscribe();
      this.lectureSubscription = null;
    }
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this.classSubscription.unsubscribe();
  }

  onSelect(event) {
  }

  filterQuizzes(event: Event) {
    const checkbox = <HTMLInputElement>event.target;
    if (checkbox.checked)
      this.newestFirst = false;
    else
      this.newestFirst = true;
    console.log(this.newestFirst);
  }

}

