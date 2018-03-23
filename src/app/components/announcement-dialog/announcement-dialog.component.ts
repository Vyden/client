import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Announcement } from '../../models/announcement';
import { AnnouncementOptions } from '../../models/announcementOptions';

@Component({
  selector: 'app-announcement-dialog',
  templateUrl: './announcement-dialog.component.html',
  styleUrls: ['./announcement-dialog.component.scss']
})
export class AnnouncementDialogComponent implements OnInit {

  // public title: string;
  // public description: string;
  // checkPost: boolean = false;
  public announcementOptions: AnnouncementOptions;
  // public returnValue: [];

  constructor(public dialogRef: MatDialogRef<AnnouncementDialogComponent>) { }

  ngOnInit() {
    if(!this.announcementOptions.checkPost){
        // this.announcementOptions.title = "";
        // this.announcementOptions.desciption = "";
        this.announcementOptions.checkPost = false;

    }
    // console.log(this.announcementOptions);
  }

  clickCreate(){
    // console.log(this.title);
    // console.log(this.description);
    // console.log(this.checkPost);
    // console.log(this.announcementOptions);
    this.dialogRef.close(this.announcementOptions);
  }
  
  
  

}
