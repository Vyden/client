import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-course-id-dialog',
  templateUrl: './course-id-dialog.component.html',
  styleUrls: ['./course-id-dialog.component.scss']
})
export class CourseIdDialogComponent implements OnInit {

  public key: string;
  
  constructor() { }

  ngOnInit() {
  }

}
