import { Directive, OnInit, Input, Output } from '@angular/core';
import { TimelineItem, ItemType } from '../../models/timelineItem';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Directive({
  selector: '[appTimelineItem]'
})
export class TimelineItemDirective implements OnInit {

  @Input('item') item: TimelineItem

  @Input('data')
  set data(dataObs: any) {
    console.log(this.item);
    if (this.item.type == ItemType.MODEL) {

    }

    if (this.item.type == ItemType.QUIZ) {
      dataObs = this._firebase.object('/tempquizzes/' + this.item.resource)
        .valueChanges()

      dataObs.subscribe((data: any) => console.log(data))

      console.log(dataObs);
    }

    if (this.item.type == ItemType.VIDEO) {

    }
  }

  constructor(private _firebase: AngularFireDatabase) {

  }

  ngOnInit() {

  }

}
