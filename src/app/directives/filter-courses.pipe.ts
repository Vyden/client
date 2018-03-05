import { Pipe, PipeTransform } from '@angular/core';
import { FilterOptions } from '../models/filter-options';
import { ClassesService } from '../services/classes/classes.service';
import { Course } from '../models/course';
import { UserInfo } from '../models/userInfo';
import { AuthService } from '../services/auth/auth.service';

@Pipe({
  name: 'filterCourses',
  pure: false
})
export class FilterCoursesPipe implements PipeTransform {

  private filterOptions: FilterOptions
  private user: UserInfo

  constructor(private _classesService: ClassesService, private _authService: AuthService) {
    this._classesService.currentFilter
      .subscribe((filter: FilterOptions) => this.filterOptions = filter)

    this._authService.currentUserInfo
      .subscribe((userInfo: UserInfo) => this.user = userInfo)
  }

  transform(value: any, args?: any): any {
    if(!this.filterOptions) return value

    let filteredValues: Course [] = value.slice(0)

    filteredValues = filteredValues.filter((course: Course) => {
      if(this.filterOptions.myCourses) {
        if(course.instructor != this.user.UID) return false
      }

      return true
    })

    return filteredValues
  }

}
