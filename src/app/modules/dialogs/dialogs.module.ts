import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/* Angular Material Modules */
import {
  MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule, MatSidenavModule, MatCardModule,
  MatInputModule, MatCheckboxModule, MatStepperModule, MatSliderModule, MatRadioModule, MatListModule,
  MatSlideToggleModule, MatProgressSpinnerModule, MatProgressBarModule, MatDialogModule
} from '@angular/material';

import { CourseFilterDialogComponent } from '../../components/course-filter-dialog/course-filter-dialog.component';
import { MessageDialogComponent } from '../../components/message-dialog/message-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule, MatSidenavModule, MatCardModule,
    MatInputModule, MatCheckboxModule, MatStepperModule, MatSliderModule, MatRadioModule, MatListModule,
    MatSlideToggleModule, MatDialogModule, MatProgressSpinnerModule, MatProgressBarModule
  ],
  declarations: [
    CourseFilterDialogComponent, MessageDialogComponent
  ],
  entryComponents: [
    CourseFilterDialogComponent, MessageDialogComponent
  ]
})
export class DialogsModule { }
