import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ClassesService } from '../../services/classes/classes.service';
import { AngularFireDatabase } from 'angularfire2/database';
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

  constructor(private _authService: AuthService,
    private _classService: ClassesService,
    private _quizzesService: QuizzesService,
    private _firebase: AngularFireDatabase) { }

  ngOnInit() {
    /* Subscribe to classes */
    this.classSubscription = this._classService.activeCourse
    .subscribe((course) => {
      this.activeCourse = course;
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
