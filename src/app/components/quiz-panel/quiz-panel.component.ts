import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ClassesService } from '../../services/classes/classes.service';
import { UserInfo } from '../../models/userInfo';
import { Course } from '../../models/course';
import { QuizResponse } from '../../models/quizResponse';
import { Subscription } from 'rxjs/Subscription';
import { QuizzesService } from '../../services/quizzes/quizzes.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-quiz-panel',
  templateUrl: './quiz-panel.component.html',
  styleUrls: ['./quiz-panel.component.scss']
})
export class QuizPanelComponent implements OnInit, OnDestroy {

  public userInfo: UserInfo;
  public activeCourse: Course;

  private authSubscription: Subscription;
  private classSubscription: Subscription;
  public quizResponseObservable: Observable<QuizResponse[]>;

  constructor(private _authService: AuthService,
    private _classService: ClassesService,
    private _quizzesService: QuizzesService) { }

  ngOnInit() {
    /* Subscribe to classes */
    this.classSubscription = this._classService.activeCourse
    .subscribe((course) => {
      this.activeCourse = course;

      if (this.userInfo && this.activeCourse) {
        this.quizResponseObservable = this._quizzesService.getQuizResponseObservable(this.userInfo.UID, this.activeCourse.id);
      }
    });

    /* Subscribe to user info */
    this.authSubscription = this._authService.currentUserInfo
      .subscribe((userInfo: UserInfo) => {
        this.userInfo = userInfo;
      });
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
    this.classSubscription.unsubscribe();
  }

  public isClassInstructor(): boolean {
    if (this.userInfo && this.activeCourse) {
      if (this.userInfo.UID === this.activeCourse.instructor) return true;
    }
    return false;
  }

}
