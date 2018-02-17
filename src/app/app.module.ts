import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

/* Angular Material Modules */
import {
  MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule, MatSidenavModule, MatCardModule,
  MatInputModule, MatCheckboxModule, MatStepperModule, MatSliderModule, MatRadioModule
} from '@angular/material';

/* Services */
import { NavbarService } from './services/navbar/navbar.service';
import { ThemeService } from './services/theme/theme.service';
import { ClassesService } from './services/classes/classes.service';
import { LectureEditorService } from './services/lecture-editor/lecture-editor.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsernameComponent } from './components/username/username.component';
import { CardBoilerplateComponent } from './components/card-boilerplate/card-boilerplate.component';
import { MainPanelComponent } from './components/main-panel/main-panel.component';
import { SidenavContentComponent } from './components/home/sidenav-content/sidenav-content.component';
import { LectureEditorComponent } from './components/lecture-editor/lecture-editor.component';
import { DoneTickComponent } from './components/done-tick/done-tick.component';
import { SidenavHeaderComponent } from './components/home/sidenav-content/sidenav-header/sidenav-header.component';
import { SidenavBodyComponent } from './components/home/sidenav-content/sidenav-body/sidenav-body.component';
import { SidenavLectureComponent } from './components/home/sidenav-content/sidenav-lecture/sidenav-lecture.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ModelEditorComponent } from './components/model-editor/model-editor.component';
import { AnnouncementsCardComponent } from './components/announcements-card/announcements-card.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    UsernameComponent,
    CardBoilerplateComponent,
    MainPanelComponent,
    SidenavContentComponent,
    LectureEditorComponent,
    DoneTickComponent,
    SidenavHeaderComponent,
    SidenavBodyComponent,
    SidenavLectureComponent,
    QuizComponent,
    ModelEditorComponent,
    AnnouncementsCardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    FlexLayoutModule,
    MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule, MatSidenavModule, MatCardModule,
    MatInputModule, MatCheckboxModule, MatStepperModule, MatSliderModule, MatRadioModule
  ],
  providers: [NavbarService, ThemeService, ClassesService, LectureEditorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
