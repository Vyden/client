import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';
// import { LecturesService } from '../../services/lectures/lectures.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Lecture } from '../../models/lecture';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit {

  public themeClass: string
  public lectures: Observable<Lecture []>

  classList: number[] = [
    // {
    //   "name": "Douglas  Pace"
    // },
    // {
    //   "name": "Mcleod  Mueller"
    // },
    // {
    //   "name": "Day  Meyers"
    // },
    // {
    //   "name": "Aguirre  Ellis"
    // },
    // {
    //   "name": "Cook  Tyson"
    // }
    1 , 2 , 3, 4, 5
  ];

  selectedStatus: boolean = false;


  selectList: boolean[] = [
    false,false,false,false,false
  ];

  clickList: boolean[] = [
    false,false,false,false,false
  ];

  constructor(private _themeService: ThemeService,
    // private _lecturesService: LecturesService,
    private _firebase: AngularFireDatabase
  ) { }

  ngOnInit() {
    
    this._themeService.currentThemeClass
      .subscribe((themeClass: string) => {
        this.themeClass = themeClass;
        // this.lectures = this._lecturesService.getFirebaseLectures()
      })
  }

  onClickLecture(i){
    // console.log("lecture " + i);
    console.log('lectures are ' + this.lectures);
    this.lectures.subscribe(res => {
      console.log(res);
      // this.data = res;
   });
    // if(!this.clickList[i]){
    //   this.selectList[i] = true;
    // }
    this.selectList[i] = !this.selectList[i];
  }

  onClickCancel(i){
    console.log("cancel " + i);
    // 
    this.clickList[i] = true;
    this.selectList[i] = false;
    setTimeout(() => {
      this.clickList[i] = false;
    }, 500);
  }

}
