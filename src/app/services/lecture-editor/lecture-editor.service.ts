import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { TimelineItem } from '../../models/timelineItem';
import { Quiz } from '../../models/quiz';
import { Observable } from 'rxjs/Observable';
import { Lecture } from '../../models/lecture';
import { ClassesService } from '../classes/classes.service';
import { Course } from '../../models/course';

@Injectable()
export class LectureEditorService {

  // Course data
  public currentCourseId: string = "hesgotapumpee"
  public lectureId: string

  // Current lecture data
  private lectureIdSource = new BehaviorSubject<string>(null)
  public currentLectureId = this.lectureIdSource.asObservable()

  // TimelineItem data
  private timelineItems: TimelineItem[]
  private timelineItemsSource = new BehaviorSubject<TimelineItem[]>([])
  public currentTimelineItems = this.timelineItemsSource.asObservable()

  constructor(private _firebase: AngularFireDatabase, private _classesService: ClassesService) {
    // Subscribe to changes in timelineitem array
    this.currentTimelineItems
      .subscribe((timelineItems: TimelineItem[]) => {
        this.timelineItems = timelineItems
      })

    // Subscribe to changes in lectureId
    this.currentLectureId
      .subscribe((lectureId: string) => {
        this.lectureId = lectureId
      })

    // Subscribe to changes in course
    this._classesService.activeCourse
      .subscribe((course: Course) => {
        if (course)
          this.currentCourseId = course.id
      })
  }

  public publishLecture(newLecture: Lecture): string {

    const key: string = this._firebase.list(`Courses/${this.currentCourseId}/lectures`)
      .push(newLecture)
      .key

    this._firebase.object(`Courses/${this.currentCourseId}/lectures/${key}`)
      .update({ id: key })

    this.changeLectureId(key)

    return key
  }

  public changeLectureId(lectureId: string) {
    this.lectureIdSource.next(lectureId)
  }

  public changeTimelineItems(timelineItems: TimelineItem[]) {
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
    return this._firebase.list(`Courses/${this.currentCourseId}/quizzes`)
      .push(quiz)
      .key
  }

  public publishTimelineItem(timelineItem: TimelineItem): string {
    console.log('PUSHING QUIZ to ' + `Courses/${this.currentCourseId}/lectures/${this.lectureId}/timeline/`);
    return this._firebase.list(`Courses/${this.currentCourseId}/lectures/${this.lectureId}/timeline/`)
      .push(timelineItem)
      .key
  }

  public getFirebaseTimelineItems(): Observable<TimelineItem[]> {
    return this._firebase.list<TimelineItem>(`Courses/${this.currentCourseId}/lectures/${this.lectureId}/timeline`).valueChanges()
  }

}
