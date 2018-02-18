import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { TimelineItem } from '../../models/timelineItem';
import { Quiz } from '../../models/quiz';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LectureEditorService {

  private timelineItems: TimelineItem []
  private timelineItemsSource = new BehaviorSubject<TimelineItem []>([])
  public currentTimelineItems = this.timelineItemsSource.asObservable()

  constructor(private _firebase: AngularFireDatabase) {
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

  public publishQuiz(quiz: Quiz): string {
    return this._firebase.list('tempquizzes')
      .push(quiz)
      .key
  }

  public publishTimelineItem(timelineItem: TimelineItem): string {
    return this._firebase.list('temptimelineitems')
      .push(timelineItem)
      .key
  }

  public getFirebaseTimelineItems(): Observable<TimelineItem []> {
    return this._firebase.list<TimelineItem>('temptimelineitems').valueChanges()
  }

}
