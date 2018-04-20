import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FilterLectureOptions } from '../../models/filter-lecture-options'

@Component({
  selector: 'app-lecture-filter-dialog',
  templateUrl: './lecture-filter-dialog.component.html',
  styleUrls: ['./lecture-filter-dialog.component.scss']
})
export class LectureFilterDialogComponent implements OnInit {

  public filterOptions: FilterLectureOptions

  public defaultArgs: FilterLectureOptions

  public checkOld: boolean


  //Filter options
  sortBy: string = 'New First';

  sortingOptions = [
    'Old First',
    'New First',
  ];

  constructor(private _dialogRef: MatDialogRef<LectureFilterDialogComponent>) { }

  ngOnInit() {
    this.filterOptions = this.defaultArgs || new FilterLectureOptions();
  }

  public closeDialog() {
    if (this.sortBy === 'Old First') {
      this.filterOptions.oldFirst = true;
    } else {
      this.filterOptions.oldFirst = false;
    }

    this._dialogRef.close(true)
  }

}
