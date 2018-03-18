import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { UserInfo } from '../../models/userInfo';
import { FilterOptions } from '../../models/filter-options';
import { DialogOptions } from '../../models/dialogOptions';
import { CourseFilterDialogComponent } from '../../components/course-filter-dialog/course-filter-dialog.component';
import { MessageDialogComponent } from '../../components/message-dialog/message-dialog.component';
import { AnnouncementDialogComponent } from '../../components/announcement-dialog/announcement-dialog.component';

@Injectable()
export class DialogsService {

    constructor(private dialog: MatDialog) {
    }

    public result: Observable<string>;

    public createCourse(title: string, message: string, userInfo: UserInfo): Observable<string> {

        let dialogRef: MatDialogRef<DialogComponent>;

        dialogRef = this.dialog.open(DialogComponent, {
            width: '380px',
        });

        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;
        dialogRef.componentInstance.userInfo = userInfo;

        return dialogRef.afterClosed();
    }

    public createAnnouncement(){
        let dialogRef: MatDialogRef<AnnouncementDialogComponent>;

        dialogRef = this.dialog.open(AnnouncementDialogComponent, {
          
        });
            
        return dialogRef.afterClosed();
    }

    public openCourseFilterDialog(defaultArgs: FilterOptions, options?: any) {
        let dialogRef: MatDialogRef<CourseFilterDialogComponent>
        dialogRef = this.dialog.open(CourseFilterDialogComponent, options)
        dialogRef.componentInstance.defaultArgs = defaultArgs

        return dialogRef.afterClosed()
    }

    public openMessageDialog(dialogOptions?: DialogOptions) {
        if (!dialogOptions) dialogOptions = new DialogOptions()

        let dialogRef: MatDialogRef<MessageDialogComponent>
        dialogRef = this.dialog.open(MessageDialogComponent)
        dialogRef.componentInstance.dialogOptions = dialogOptions

        return dialogRef.afterClosed()
    }

}
