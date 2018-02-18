import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { DoneTickComponent } from '../done-tick/done-tick.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemeService } from '../../services/theme/theme.service';
import { LectureEditorService } from '../../services/lecture-editor/lecture-editor.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { TimelineItem } from '../../models/timelineItem';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-lecture-editor',
  templateUrl: './lecture-editor.component.html',
  styleUrls: ['./lecture-editor.component.scss']
})
export class LectureEditorComponent implements OnInit, OnDestroy {

  public lectureEndTime: number // End time in seconds
  public timelineItems: Observable<TimelineItem []>

  constructor(private _themeService: ThemeService, 
    private _lectureEditorService: LectureEditorService,
    private _firebase: AngularFireDatabase) {
    this.lectureEndTime = 3000
  }

  ngOnInit() {
    this._themeService.changeThemeClass("deep-purple");

    this.timelineItems = this._lectureEditorService.getFirebaseTimelineItems()
  }

  ngOnDestroy() {
    this._themeService.changeThemeClass("default");
  }

}
