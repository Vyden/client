import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { ClassesService } from '../../services/classes/classes.service'
import { UserInfo } from '../../models/userInfo';
import { Course } from '../../models/course';

@Component({
  selector: 'app-quiz-panel',
  templateUrl: './quiz-panel.component.html',
  styleUrls: ['./quiz-panel.component.scss']
})
export class QuizPanelComponent implements OnInit {

  public userInfo: UserInfo;
  public activeCourse: Course;

  constructor(private _authService: AuthService,
                    private _classService: ClassesService) { }

  ngOnInit() {
    /* Subscribe to user info */
    this._authService.currentUserInfo
      .subscribe((userInfo: UserInfo) => {
        this.userInfo = userInfo;
      })

    this._classService.activeCourse
      .subscribe((course) => {
        this.activeCourse = course;
      })
  }

  public isClassInstructor(): boolean {
    if (this.userInfo && this.activeCourse) {
      if (this.userInfo.UID === this.activeCourse.instructor) return true;
    }
    return false;
  }

}
