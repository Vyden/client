import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { UsernameComponent } from '../username/username.component';
import { NavbarService } from '../../services/navbar/navbar.service';
import { ThemeService } from '../../services/theme/theme.service';
import { AuthService } from '../../services/auth/auth.service';
import { UserInfo } from '../../models/userInfo';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public themeClass: string
  public themeColors: string[] = this._themeService.getThemes().map(themeArray => themeArray[0])

  public leftSidenav: MatSidenav

  public userInfo: UserInfo

  constructor(private _navbarService: NavbarService, 
    private _themeService: ThemeService,
    private _authService: AuthService) { }

  ngOnInit() {
    /* Listen for changes to sidenav */
    this._navbarService.currentLeftSidenav
      .subscribe((sidenav: MatSidenav) => {
        this.leftSidenav = sidenav
      })

    /* Listen for changes to theme */
    this._themeService.currentThemeClass
      .subscribe((themeClass: string) => {
        this.themeClass = themeClass
      })

    /* Listen for changes to userinfo */
    this._authService.currentUserInfo
      .subscribe((userInfo: UserInfo) => {
        this.userInfo = userInfo
      })
  }

  public changeTheme(theme: string) {
    this._themeService.changeThemeClass(theme)
  }

}
