import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatDialogRef} from '@angular/material';
import { UsernameComponent } from '../username/username.component';
import { NavbarService } from '../../services/navbar/navbar.service';
import { ThemeService } from '../../services/theme/theme.service';
import { AuthService } from '../../services/auth/auth.service';
import { DialogsService } from '../../services/dialogs/dialogs.service';
import { ClassesService } from '../../services/classes/classes.service';
import { CreateCourseService } from '../../services/create-course/create-course.service';
import { UserInfo } from '../../models/userInfo';
import { Course } from '../../models/course';


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

  public isInstructor: boolean;

  constructor(private _navbarService: NavbarService, 
    private _themeService: ThemeService,
    private _authService: AuthService,
    private _dialogsService: DialogsService,
    private _createCourseService: CreateCourseService) { }

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
        // this.isInstructor = userInfo.isInstructor;
        if(userInfo){
          console.log(userInfo.fullName);
        }
      })

    

  }

  public changeTheme(theme: string) {
    this._themeService.changeThemeClass(theme)
  }

  public logout() {
    this._authService.logout()
  }

  public result: any;
  public courseName: string = "";


  public openDialog() {
    this._dialogsService
      .createCourse('Create new course', this.courseName, this.userInfo)
      .subscribe(res => {
        this.result = res
       
        if(res){
          let key = this._createCourseService.createCourse(res);
          alert("Success! The course ID is " + key);
        }
        
      });
  }

}


