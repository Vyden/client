import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Announcement } from '../../models/announcement';

@Component({
  selector: 'app-announcement-dialog',
  templateUrl: './announcement-dialog.component.html',
  styleUrls: ['./announcement-dialog.component.scss']
})
export class AnnouncementDialogComponent implements OnInit {

  public title: string;
  public description: string;
  checkPost: boolean = false;
  // public returnValue: [];

  constructor(public dialogRef: MatDialogRef<AnnouncementDialogComponent>) { }

  ngOnInit() {
    
  }

  clickCreate(){

    // this.dialogRef.close(this.message);
  }
  
  
  

}
