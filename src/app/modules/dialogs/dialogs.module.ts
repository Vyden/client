import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Angular Material Modules */
import {
  MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule, MatSidenavModule, MatCardModule,
  MatInputModule, MatCheckboxModule, MatStepperModule, MatSliderModule, MatRadioModule, MatListModule,
  MatSlideToggleModule, MatProgressSpinnerModule, MatProgressBarModule, MatDialogModule
} from '@angular/material';

import { CourseFilterDialogComponent } from '../../components/course-filter-dialog/course-filter-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule, MatSidenavModule, MatCardModule,
    MatInputModule, MatCheckboxModule, MatStepperModule, MatSliderModule, MatRadioModule, MatListModule,
    MatSlideToggleModule, MatDialogModule, MatProgressSpinnerModule, MatProgressBarModule
  ],
  declarations: [
    CourseFilterDialogComponent
  ],
  entryComponents: [
    CourseFilterDialogComponent
  ]
})
export class DialogsModule { }
