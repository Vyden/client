import { Component, OnInit, Input } from '@angular/core';
import { LectureEditorService } from '../../services/lecture-editor/lecture-editor.service';
import { TimelineItem, ItemType } from '../../models/timelineItem';
import { Course } from '../../models/course'
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { TimelineItemDirective } from '../../directives/timeline-item/timeline-item.directive';
import { ClassesService } from '../../services/classes/classes.service';
import { QuizItem } from '../../models/quizItem';
import { Quiz } from '../../models/quiz';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  @Input() lectureTime: number

  public Math = Math

  // Timeline Data
  public timelineItems: TimelineItem[] = []
  public timelineChildren: any[] = []

  // Course Data
  public currentCourseId: string = "hesgotapumpee"
  public currentLectureId: string

  constructor(private _lectureEditorService: LectureEditorService, private _firebase: AngularFireDatabase, private _classesService: ClassesService) { }

  ngOnInit() {

    this._classesService.activeCourse
      .subscribe((course: Course) => {
        if(course) this.currentCourseId = course.id
      })

    this._lectureEditorService.currentLectureId
      .subscribe((lectureId: string) => {
        if (lectureId) {
          this.currentLectureId = lectureId

          if (this.currentLectureId) {
            this._lectureEditorService.getFirebaseTimelineItems()
              .subscribe((items: TimelineItem[]) => {
                this.timelineItems = items
                this.timelineChildren = []
                this.timelineItems.forEach((item: TimelineItem) => {
                  let childObs
                  if (item.type == ItemType.QUIZ) {
                    childObs = this._firebase.object(`Courses/${this.currentCourseId}/quizzes/${item.resource}`).valueChanges()

                    console.log('requesting: ', `Courses/${this.currentCourseId}/quizzes/${item.resource}`);

                    childObs.subscribe((res: any) => console.log('res: ', res))
                  } else {
                    childObs = null
                  }
                  this.timelineChildren.push(childObs)
                })
              })
          }
        }
      })

  }

  public redirect(url: string) {
    window.location.href = url
  }

  public deleteQuiz(item: QuizItem, quiz: Quiz) {
    this._lectureEditorService.deleteQuiz(item, quiz)
  }

  public editQuiz(item: QuizItem, quiz: Quiz) {
    this._lectureEditorService.changeEditQuiz([item, quiz])
  }

}
