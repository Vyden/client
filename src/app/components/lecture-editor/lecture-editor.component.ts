import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { DoneTickComponent } from '../done-tick/done-tick.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemeService } from '../../services/theme/theme.service';
import { LectureEditorService } from '../../services/lecture-editor/lecture-editor.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { TimelineItem } from '../../models/timelineItem';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth/auth.service';
import { UserInfo } from '../../models/userInfo';
import { UploadService } from '../../services/upload/upload.service';

@Component({
  selector: 'app-lecture-editor',
  templateUrl: './lecture-editor.component.html',
  styleUrls: ['./lecture-editor.component.scss']
})
export class LectureEditorComponent implements OnInit, OnDestroy {

  /* User data */
  public userInfo: UserInfo

  /* Lecture data */
  public lectureEndTime: number // End time in seconds
  public timelineItems: Observable<TimelineItem[]>

  /* Dropzone data */
  public dropzoneActive: boolean

  constructor(private _themeService: ThemeService,
    private _lectureEditorService: LectureEditorService,
    private _firebase: AngularFireDatabase,
    private _authService: AuthService,
    private _uploadService: UploadService) {
    this.lectureEndTime = 3000
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
    
    this._themeService.changeThemeClass("deep-purple");

    this.timelineItems = this._lectureEditorService.getFirebaseTimelineItems()
  }

  ngOnDestroy() {
    this._themeService.changeThemeClass("default");
  }

  public dropzoneState($event: boolean) {
    this.dropzoneActive = $event
    console.log(this.dropzoneActive)
  }

  public handleDrop(fileList: FileList) {
    console.log(fileList);
    this._uploadService.uploadVideoFile(fileList[0])
  }

}
