import { Component, OnInit } from '@angular/core';

/* Models */
import { UserInfo } from '../../models/userInfo';

/* Services */
import { ClassesService } from '../../services/classes/classes.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {

  /* User data */
  public userInfo: UserInfo

  constructor(private _authService: AuthService, private _classesService: ClassesService) { }

  ngOnInit() {
    /* Subscribe to changes to the user */
    this._authService.currentUserObservable
      .subscribe((user: any) => {
        // Allows page access only if the user is logged in
        this._authService.checkLogin()
      })

    /* Subscribe to user info */
    this._authService.currentUserInfo
      .subscribe((userInfo: UserInfo) => {
        this.userInfo = userInfo
      })
  }

}
