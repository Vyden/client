import { Component, OnInit, Input } from '@angular/core';
import { LectureEditorService } from '../../services/lecture-editor/lecture-editor.service';
import { TimelineItem, ItemType } from '../../models/timelineItem';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { TimelineItemDirective } from '../../directives/timeline-item/timeline-item.directive';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  @Input() lectureTime: number

  public Math = Math
  public timelineItems: TimelineItem[] = []
  public timelineChildren: any[] = []

  constructor(private _lectureEditorService: LectureEditorService, private _firebase: AngularFireDatabase) { }

  ngOnInit() {
    this._lectureEditorService.getFirebaseTimelineItems()
      .subscribe((items: TimelineItem[]) => {
        this.timelineItems = items
        this.timelineChildren = []
        this.timelineItems.forEach((item: TimelineItem) => {
          this.timelineChildren.push(this._firebase.object('tempquizzes/' + item.resource).valueChanges())
        })
      })
  }

  public getTimelineItem(item: TimelineItem) {

  }

}
