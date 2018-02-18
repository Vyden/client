import { Component, OnInit, Input } from '@angular/core';
import { LectureEditorService } from '../../services/lecture-editor/lecture-editor.service';
import { TimelineItem } from '../../models/timelineItem';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  @Input() lectureTime: number

  public timelineItems: TimelineItem []

  constructor(private _lectureEditorService: LectureEditorService) { }

  ngOnInit() {
    this._lectureEditorService.currentTimelineItems
      .subscribe((items: TimelineItem []) => {
        this.timelineItems = items
      })
  }

}
