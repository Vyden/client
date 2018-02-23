import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
import { LecturesService } from '../../services/lectures/lectures.service';
import { AuthService } from '../../services/auth/auth.service';
import { ClassesService } from '../../services/classes/classes.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
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
  public lectures: Observable<Lecture []>
  public userInfo: UserInfo
  public currentCourse: Course


  classList: number[] = [
    1 , 2
  ];

  lectureList: Lecture[] = [

  ]


  lectureArray: LectureArray[] = [
   
  ]

  selectedStatus: boolean = false;


  selectList: boolean[] = [
    false,false,false,false,false
  ];

  clickList: boolean[] = [
    false,false,false,false,false
  ];

  constructor(private _themeService: ThemeService,
    private _lecturesService: LecturesService,
    private _authService: AuthService,
    private _firebase: AngularFireDatabase,
    private _classesService: ClassesService,
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
        // this.lectures = this._lecturesService.getFirebaseLectures()
      })

    // this.lectures.subscribe(res => {
    //   // this.lectureList = res[1].lectures;
    //   this.lectureArray = Object.values(this.lectureList);
    // });

    this._classesService.activeCourse
    .subscribe((currentCourse: Course) => {
      this.currentCourse = currentCourse
      if(currentCourse){
        this.lectures = this._lecturesService.getFirebaseLectures()
    
        this.lectures.subscribe(res => {
            this.lectureList = res;
            
          });
      }
      // console.log(this.currentCourse)
    })

  }

  onClickLecture(i){
    // console.log(this.lectureList);
    // console.log(this.lectureArray[i]);
    // console.log(this.currentCourse.id);
    
        
    this.selectList[i] = !this.selectList[i];
  }

  onClickCancel(i){
    this.clickList[i] = true;
    this.selectList[i] = false;
    setTimeout(() => {
      this.clickList[i] = false;
    }, 500);
  }


  openLecture(i){
    window.location.href = "../../../../assets/VR/index.html?course=" + this.currentCourse.id + "&lecture=" + this.lectureList[i].id;
  }

  convertString(date: number): string{
     let stringDate = String(new Date(date));

    return stringDate;
  }

  getInstructorName(id : string): string{
      let instructorID = String(this._firebase.object(`Courses/${this.currentCourse.id}/instructor`));
      // let instructorName = String(this._firebase.object(`UserInfo/${instructorID}/fullName`));      
      //  console.log(instructorName);

      // this._firebase.object(`Courses/${this.currentCourseId}/lectures/${key}`)
    return "1";
  }
}
