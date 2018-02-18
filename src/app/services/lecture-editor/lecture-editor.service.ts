import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TimelineItem } from '../../models/timelineItem';

@Injectable()
export class LectureEditorService {

  private timelineItems: TimelineItem []
  private timelineItemsSource = new BehaviorSubject<TimelineItem []>([])
  public currentTimelineItems = this.timelineItemsSource.asObservable()

  constructor() {
    this.currentTimelineItems
      .subscribe((timelineItems: TimelineItem []) => {
        this.timelineItems = timelineItems
      })
  }

  public changeTimelineItems(timelineItems: TimelineItem []) {
    this.timelineItemsSource.next(timelineItems)
  }

  public addTimelineItem(timelineItem: TimelineItem) {
    this.timelineItems.push(timelineItem)
    this.changeTimelineItems(this.timelineItems)
  }

  public clearTimelineItems() {
    this.changeTimelineItems([])
  }

}
