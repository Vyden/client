import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FilterOptions } from '../../models/filter-options';

@Component({
  selector: 'app-course-filter-dialog',
  templateUrl: './course-filter-dialog.component.html',
  styleUrls: ['./course-filter-dialog.component.scss']
})
export class CourseFilterDialogComponent implements OnInit {

  public filterOptions: FilterOptions

  /* Default values */
  public defaultArgs: FilterOptions

  constructor(private _dialogRef: MatDialogRef<CourseFilterDialogComponent>) { }

  ngOnInit() {
    this.filterOptions = this.defaultArgs || new FilterOptions()
  }

}
