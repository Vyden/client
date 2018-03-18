import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { LecturesService } from '../../services/lectures/lectures.service';
import { AuthService } from '../../services/auth/auth.service';
import { ClassesService } from '../../services/classes/classes.service';
import { DialogsService } from '../../services/dialogs/dialogs.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { PanelContentService } from '../../services/panel-content/panel-content.service';
import { Course } from '../../models/course';
import { Lecture } from '../../models/lecture';
import { UserInfo } from '../../models/userInfo';
import { LectureArray } from '../../models/lectureArray';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit {

  public themeClass: string
  public userInfo: UserInfo
  public currentCourse: Course
  public currentPanel: string
  

  dialogs

  constructor(private _themeService: ThemeService,
    private _authService: AuthService,
    private _firebase: AngularFireDatabase,
    private _classesService: ClassesService,
    private _dialogsService: DialogsService,
    private _panelContentService: PanelContentService
  ) { 
   
  }

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

    this._themeService.currentThemeClass
      .subscribe((themeClass: string) => {
        this.themeClass = themeClass;
      })

      this._classesService.activeCourse
    .subscribe((currentCourse: Course) => {
      this.currentCourse = currentCourse
      if(currentCourse){
 
      }

    })
  
    
    this._panelContentService.panelContent.subscribe((currentPanel: string) => {
      this.currentPanel = currentPanel;
      console.log(currentPanel);
    })
    
  }

  openAnnouncement(){
    this._dialogsService
      .createAnnouncement()
      .subscribe(res => {
      
        
      });
  
  }

 

 
  
}
