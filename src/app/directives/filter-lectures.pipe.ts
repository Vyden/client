import { Pipe, PipeTransform } from '@angular/core';
import { FilterLectureOptions } from '../models/filter-lecture-options';
import { Lecture } from '../models/lecture';
import { LecturesService } from '../services/lectures/lectures.service';

@Pipe({
  name: 'filterLectures',
  pure: false
})
export class FilterLecturesPipe implements PipeTransform {

  private filterOptions: FilterLectureOptions;

  constructor(private _lectureService: LecturesService) {
    this._lectureService.currentFilter
      .subscribe((filter: FilterLectureOptions) => this.filterOptions = filter)
  }

  transform(value: Lecture[], args?: any): any {
    if (!this.filterOptions) return value;

    if (this.filterOptions.oldFirst) {
      value = value.sort((lecture1: Lecture, lecture2: Lecture) => {
        return lecture1.date - lecture2.date;
      })
    } else {
      value = value.sort((lecture1: Lecture, lecture2: Lecture) => {
        return lecture2.date - lecture1.date;
      })
    }

    value = value.filter((lecture: Lecture) => {
      return new Date(lecture.date) >= this.filterOptions.startDate && new Date(lecture.date) <= this.filterOptions.endDate;
    })

    return value;
  }

}
