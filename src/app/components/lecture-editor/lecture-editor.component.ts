import { Component, OnInit, OnDestroy } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { DoneTickComponent } from '../done-tick/done-tick.component';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ThemeService } from '../../services/theme/theme.service';
import { LectureEditorService } from '../../services/lecture-editor/lecture-editor.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { HttpEventType, HttpResponse } from '@angular/common/http';
//import { DisableControlDirective } from '../../directives/disable-control/disable-control.directive';
import { TimelineItem, ItemType } from '../../models/timelineItem';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth/auth.service';
import { UserInfo } from '../../models/userInfo';
import { UploadService } from '../../services/upload/upload.service';
import { VideoItem } from '../../models/videoItem';
import { v4 as uuid } from 'uuid';
import { ClassesService } from '../../services/classes/classes.service';
import { Course } from '../../models/course';
import { Lecture } from '../../models/lecture';

export class RequiredTextMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched))
  }
}

@Component({
  selector: 'app-lecture-editor',
  templateUrl: './lecture-editor.component.html',
  styleUrls: ['./lecture-editor.component.scss']
})
export class LectureEditorComponent implements OnInit, OnDestroy {

  /* User data */
  public userInfo: UserInfo

  /* Lecture data */
  public lectureId: string
  public lectureEndTime: number // End time in seconds
  public lectureName: string
  public lectureDescription: string
  public lectureSky: string
  public timelineItems: Observable<TimelineItem[]>

  /* Skybox data */
  public skyboxType: "image" | "color"
  public skyboxColor: string
  public skyboxUrl: string

  /* Dropzone data */
  public showDropBox: boolean
  public showSubtitleDropBox: boolean
  public dropzoneActive: boolean
  public dropzoneSubtitleActive: boolean
  public videoActive: boolean
  public subtitleActive: boolean
  public showPublishProgress: boolean
  public showSubtitlePublishProgress: boolean
  public showUploadProgress: boolean
  public showSubtitleUploadProgress: boolean
  public uploadProgress: number
  public subtitleUploadProgress: number
  public videoName: string
  public subtitleName: string

  /* Course data */
  private currentCourseId: string

  /* Form Control */
  public basicFormControl: FormGroup
  public matcher: ErrorStateMatcher

  /* Theme data */
  private themeActive = false
  private initialThemeClass = 'default'

  public Math = Math


  constructor(private _router: Router,
    private _formBuilder: FormBuilder,
    private _themeService: ThemeService,
    private _lectureEditorService: LectureEditorService,
    private _firebase: AngularFireDatabase,
    private _authService: AuthService,
    private _uploadService: UploadService,
    private _classesService: ClassesService) {
    this.lectureEndTime = 3000
    this.showDropBox = true
    this.showSubtitleDropBox = true
    this.lectureName = "New Lecture"
    this.skyboxType = "image"
    this.skyboxColor = "E0F7FA"
    this.skyboxUrl = "default"
    this.lectureDescription = "Lecture"

    this.basicFormControl = this._formBuilder.group({
      skyboxUrl: [null, Validators.required],
      skyboxColor: [null, Validators.required],
      lectureDescription: [null, Validators.required],
      lectureName: [null, Validators.required]
    })
    this.matcher = new RequiredTextMatcher()
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

    /* Subscribe to lecture ID */
    this._lectureEditorService.currentLectureId
      .subscribe((lectureId: string) => {
        this.lectureId = lectureId
      })

    /* Subscribe to changes in course */
    this._classesService.activeCourse
      .subscribe((course: Course) => {
        if (course)
          this.currentCourseId = course.id
        else
          this._router.navigate(['/'])
      })

    /* Subsribe to changes in theme class */
    this._themeService.currentThemeClass
      .subscribe((themeClass: string) => {
        if (!this.themeActive) {
          this.themeActive = true
          this.initialThemeClass = themeClass
          this._themeService.changeThemeClass("deep-purple")
          console.log(this.initialThemeClass)
        }
      })
  }

  ngOnDestroy() {
    this._themeService.changeThemeClass(this.initialThemeClass.substring(0, this.initialThemeClass.indexOf("-theme")))
  }

  public dropzoneState($event: boolean) {
    this.dropzoneActive = $event
    console.log(this.dropzoneActive)
  }

  public dropzoneSubtitleState($event: boolean) {
    this.dropzoneSubtitleActive = $event
  }

  public onUpload($event: any) {
    if ($event.srcElement.files.length) {
      this.handleDrop($event.srcElement.files)
    }
  }

  public onUploadSubtitle($event: any) {
    if ($event.srcElement.files.length) {
      this.handleSubtitleDrop($event.srcElement.files)
    }
  }

  public handleSubtitleDrop(fileList: FileList) {
    this.subtitleUploadProgress = 0
    this.subtitleActive = false
    this.showSubtitleUploadProgress = true
    this.showSubtitleDropBox = false
    this.subtitleName = fileList[0].name

    // Rename file
    let blob = fileList[0].slice(0, -1, '.')
    const subtitleFile: File = new File([blob], uuid(), { type: fileList[0].type })

    console.log(subtitleFile);

    this._uploadService.uploadSubtitleFile(subtitleFile)
      .subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * event.loaded / event.total);
          this.subtitleUploadProgress = percentDone
          console.log(`File is ${percentDone}% uploaded.`);
        } else if (event instanceof HttpResponse) {
          this.showSubtitleUploadProgress = false

          console.log('File is completely uploaded!');

          this.showSubtitleDropBox = false
          this.subtitleActive = true

          this._lectureEditorService.publishSubtitle('https://s3.us-east-2.amazonaws.com/vyden/srts/' + subtitleFile.name);
        }
      })
  }

  public handleDrop(fileList: FileList) {
    // Create lecture object
    const newLecture: Lecture = {
      course: this.currentCourseId,
      title: this.lectureName,
      description: this.lectureDescription,
      timeline: [],
      date: Date.now(),
      sky: "#E0F7FA"
    }
    this._lectureEditorService.publishLecture(newLecture)

    this.uploadProgress = 0
    this.videoActive = false
    this.showUploadProgress = true
    this.showDropBox = false
    this.videoName = fileList[0].name

    // Rename file
    let blob = fileList[0].slice(0, -1, '.')
    const videoFile: File = new File([blob], uuid(), { type: fileList[0].type })
    console.log(videoFile.type);

    console.log(videoFile)

    this._uploadService.uploadVideoFile(videoFile)
      .subscribe((event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          // This is an upload progress event. Compute and show the % done:
          const percentDone = Math.round(100 * event.loaded / event.total);
          this.uploadProgress = percentDone
          console.log(`File is ${percentDone}% uploaded.`);
        } else if (event instanceof HttpResponse) {
          this.showUploadProgress = false

          console.log('File is completely uploaded!');

          this.showDropBox = false
          this.videoActive = true
          let vid = document.createElement('video');
          const fileURL = URL.createObjectURL(videoFile);
          vid.src = fileURL;
          // wait for duration to change from NaN to the actual duration
          vid.ondurationchange = () => {
            this.lectureEndTime = vid.duration

            const videoItem: VideoItem = {
              name: 'Lecture Video',
              lecture: this.lectureId,
              eventTime: 1,
              type: ItemType.VIDEO,
              resource: "https://s3.us-east-2.amazonaws.com/vyden/videos/" + videoFile.name,
              videoTime: this.lectureEndTime
            }

            this._lectureEditorService.publishTimelineItem(videoItem)
          };
        }
      })
  }

  public publishLecture() {
    this.showPublishProgress = true

    const skybox = this.skyboxType == 'image' ? this.skyboxUrl : '#' + this.skyboxColor

    this._lectureEditorService.updateLecture({
      sky: skybox,
      title: this.lectureName,
      description: this.lectureDescription,
      instructor: this.userInfo.UID
    })

    setTimeout(() => {
      this.uploadProgress = 0
      this._router.navigate(['/'])
    }, 1000)
  }

}
