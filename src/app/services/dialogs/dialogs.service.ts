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
import { AnnouncementOptions } from '../../models/announcementOptions';
import { QuizDataDialogComponent } from '../../components/quiz-data-dialog/quiz-data-dialog.component';
import { ChangeEmailDialogComponent } from '../../components/change-email-dialog/change-email-dialog.component';
import { CourseIdDialogComponent } from '../../components/course-id-dialog/course-id-dialog.component';
import { FilterLectureOptions } from '../../models/filter-lecture-options';
import { LectureFilterDialogComponent } from '../../components/lecture-filter-dialog/lecture-filter-dialog.component';

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

    public displayCourseID(key : string){
        let dialogRef: MatDialogRef<CourseIdDialogComponent>;
        dialogRef = this.dialog.open(CourseIdDialogComponent, {
            width: '380px',
        });

        dialogRef.componentInstance.key = key;

        return dialogRef.afterClosed();
    }

    public createAnnouncement(announcementOptions: AnnouncementOptions){

        let dialogRef: MatDialogRef<AnnouncementDialogComponent>;

        dialogRef = this.dialog.open(AnnouncementDialogComponent, {
            width: '380px'
        });


        dialogRef.componentInstance.announcementOptions = announcementOptions;


        return dialogRef.afterClosed();
    }

    public openCourseFilterDialog(defaultArgs: FilterOptions, options?: any) {
        let dialogRef: MatDialogRef<CourseFilterDialogComponent>
        dialogRef = this.dialog.open(CourseFilterDialogComponent, options)
        dialogRef.componentInstance.defaultArgs = defaultArgs

        return dialogRef.afterClosed()
    }

    public openLectureFilterDialog(defaultArgs: FilterLectureOptions, options?: any) {
      let dialogRef: MatDialogRef<LectureFilterDialogComponent>
      dialogRef = this.dialog.open(LectureFilterDialogComponent, options);
      dialogRef.componentInstance.defaultArgs = defaultArgs;

      return dialogRef.afterClosed()
    }

    public openMessageDialog(dialogOptions?: DialogOptions) {
        if (!dialogOptions) dialogOptions = new DialogOptions()

        let dialogRef: MatDialogRef<MessageDialogComponent>
        dialogRef = this.dialog.open(MessageDialogComponent)
        dialogRef.componentInstance.dialogOptions = dialogOptions

        return dialogRef.afterClosed()
    }

    public openQuizCSVDialog(courseId: string, lectureId: string) {
        const options = {
            disableClose: true,
            height: '82vh',
            width: '82vw'
        }

        let dialogRef: MatDialogRef<QuizDataDialogComponent>
        dialogRef = this.dialog.open(QuizDataDialogComponent, options)
        dialogRef.componentInstance.courseId = courseId
        dialogRef.componentInstance.lectureId = lectureId

        return dialogRef.afterClosed()
    }

    public openChangeEmailDialog(options?: any) {
        let dialogRef: MatDialogRef<ChangeEmailDialogComponent>
        dialogRef = this.dialog.open(ChangeEmailDialogComponent, options)

        return dialogRef.afterClosed()
    }

}
