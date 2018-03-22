import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HotTableModule } from '@handsontable/angular';

/* Angular Material Modules */
import {
  MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule, MatSidenavModule, MatCardModule,
  MatInputModule, MatCheckboxModule, MatStepperModule, MatSliderModule, MatRadioModule, MatListModule,
  MatSlideToggleModule, MatProgressSpinnerModule, MatProgressBarModule, MatDialogModule
} from '@angular/material';

import { CourseFilterDialogComponent } from '../../components/course-filter-dialog/course-filter-dialog.component';
import { MessageDialogComponent } from '../../components/message-dialog/message-dialog.component';
import { QuizDataDialogComponent } from '../../components/quiz-data-dialog/quiz-data-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    HotTableModule,
    MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule, MatSidenavModule, MatCardModule,
    MatInputModule, MatCheckboxModule, MatStepperModule, MatSliderModule, MatRadioModule, MatListModule,
    MatSlideToggleModule, MatDialogModule, MatProgressSpinnerModule, MatProgressBarModule
  ],
  declarations: [
    CourseFilterDialogComponent, MessageDialogComponent, QuizDataDialogComponent
  ],
  entryComponents: [
    CourseFilterDialogComponent, MessageDialogComponent, QuizDataDialogComponent
  ]
})
export class DialogsModule { }
