import { Component, OnInit, Input } from '@angular/core';
import { LectureEditorService } from '../../services/lecture-editor/lecture-editor.service';
import { TimelineItem } from '../../models/timelineItem';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  @Input() lectureTime: number

  public timelineItems: Observable<TimelineItem []>

  constructor(private _lectureEditorService: LectureEditorService, private _firebase: AngularFireDatabase) { }

  ngOnInit() {
    this.timelineItems = this._lectureEditorService.getFirebaseTimelineItems()
  }

}
