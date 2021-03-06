import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HotTableModule } from '@handsontable/angular';

/* Angular Material Modules */
import {
  MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule, MatSidenavModule, MatCardModule,
  MatInputModule, MatCheckboxModule, MatStepperModule, MatSliderModule, MatRadioModule, MatListModule,
  MatSlideToggleModule, MatProgressSpinnerModule, MatProgressBarModule, MatDialogModule, MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';

import { CourseFilterDialogComponent } from '../../components/course-filter-dialog/course-filter-dialog.component';
import { LectureFilterDialogComponent } from '../../components/lecture-filter-dialog/lecture-filter-dialog.component'
import { MessageDialogComponent } from '../../components/message-dialog/message-dialog.component';
import { QuizDataDialogComponent } from '../../components/quiz-data-dialog/quiz-data-dialog.component';
import { ChangeEmailDialogComponent } from '../../components/change-email-dialog/change-email-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HotTableModule,
    MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule, MatSidenavModule, MatCardModule,
    MatInputModule, MatCheckboxModule, MatStepperModule, MatSliderModule, MatRadioModule, MatListModule,
    MatSlideToggleModule, MatDialogModule, MatProgressSpinnerModule, MatProgressBarModule, MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [
    CourseFilterDialogComponent, MessageDialogComponent, QuizDataDialogComponent, ChangeEmailDialogComponent, LectureFilterDialogComponent
  ],
  entryComponents: [
    CourseFilterDialogComponent, MessageDialogComponent, QuizDataDialogComponent, ChangeEmailDialogComponent, LectureFilterDialogComponent
  ]
})
export class DialogsModule { }
