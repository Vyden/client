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
  selector: 'app-lecture-card',
  templateUrl: './lecture-card.component.html',
  styleUrls: ['./lecture-card.component.scss']
})
export class LectureCardComponent implements OnInit {


  
  public themeClass: string
  public lectures: Observable<Lecture []>
  public userInfo: UserInfo
  public currentCourse: Course
  public instructName: string

  // classList: number[] = [
  //   1 , 2
  // ];

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
      })

    

    this._classesService.activeCourse
    .subscribe((currentCourse: Course) => {
      this.currentCourse = currentCourse
      if(currentCourse){
        this.lectures = this._lecturesService.getFirebaseLectures()
    
        this.lectures.subscribe(res => {
            this.lectureList = res;
            
          });
      this.getInstructorName();
          
      }
    })

    
  }
  id : string
  onClickLecture(i){        
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

  getName(): string{
    return this.instructName;
  }

  getInstructorName(): string{
      
    let returnName;

    let instructorID = this._firebase.object(`Courses/${this.currentCourse.id}/instructor`).valueChanges();
    
    instructorID.subscribe(res => {
      let instructorName = this._firebase.object(`UserInfo/${res}/fullName`).valueChanges();

       instructorName.subscribe(res => {
          returnName = res;
          this.instructName = String(res);
         
        } )

        return returnName;
    })

  return returnName;
}

}
