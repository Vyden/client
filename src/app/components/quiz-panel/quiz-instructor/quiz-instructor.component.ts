import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ClassesService } from '../../../services/classes/classes.service';
import { Observable } from 'rxjs/Observable';
import { Course } from '../../../models/course';
// import { Lecture } from '../../../models/lecture';

@Component({
  selector: 'app-quiz-instructor',
  templateUrl: './quiz-instructor.component.html',
  styleUrls: ['./quiz-instructor.component.scss']
})
export class QuizInstructorComponent implements OnInit {

  public currentCourse: Course;

  // data pulled from firebase
   single = [
    {
      "name": "a",
      "value": 50
    },
    {
      "name": "b",
      "value": 87
    },
    {
      "name": "c",
      "value": 67
    },
    {
      "name": "d",
      "value": 100
    }
  ];

  // changing the size of graph
  view: any[] = [500, 200];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Answer Choice';
  showYAxisLabel = true;
  yAxisLabel = 'Number of Students';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private _firebase: AngularFireDatabase,
    private _classesService: ClassesService) { }

  ngOnInit() {
    this._classesService.activeCourse
      .subscribe((currentCourse: Course) => {
        this.currentCourse = currentCourse
        
      })
  }

  onSelect(event) {
    console.log(event);
  }

}
