import { Component, OnInit, OnDestroy } from '@angular/core';

/* Models */
import { UserInfo } from '../../models/userInfo';

/* Services */
import { ClassesService } from '../../services/classes/classes.service';
import { AuthService } from '../../services/auth/auth.service';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit, OnDestroy {

  /* User data */
  public userInfo: UserInfo
  public authState: any

  constructor(private _authService: AuthService,
    private _classesService: ClassesService,
    private _themeService: ThemeService) { }

  ngOnInit() {
    /* Subscribe to changes to the authstate */
    this._authService.currentUserObservable
      .subscribe((user: any) => {
        // Allows page access only if the user is logged in
        this._authService.checkLogin()
        this.authState = user
      })

    /* Subscribe to user info */
    this._authService.currentUserInfo
      .subscribe((userInfo: UserInfo) => {
        this.userInfo = userInfo
      })

    /* Change to indigo theme for this page */
    this._themeService.changeThemeClass("indigo");
  }

  ngOnDestroy() {
    this._themeService.changeThemeClass("default");
  }

}
