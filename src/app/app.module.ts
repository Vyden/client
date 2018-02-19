import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';

/* Angular Material Modules */
import {
  MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule, MatSidenavModule, MatCardModule,
  MatInputModule, MatCheckboxModule, MatStepperModule, MatSliderModule, MatRadioModule, MatListModule
} from '@angular/material';

/* Services */
import { NavbarService } from './services/navbar/navbar.service';
import { ThemeService } from './services/theme/theme.service';
import { ClassesService } from './services/classes/classes.service';
import { LectureEditorService } from './services/lecture-editor/lecture-editor.service';
import { AuthService } from './services/auth/auth.service';

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
import { FocusOnCreateDirective } from './directives/focus-on-create/focus-on-create.directive';
import { TimelineComponent } from './components/timeline/timeline.component';
import { OnCreateDirective } from './directives/oncreate/on-create.directive';
import { TimelineItemDirective } from './directives/timeline-item/timeline-item.directive';


@NgModule({
  declarations: [
    OnCreateDirective,
    TimelineItemDirective,
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
    FocusOnCreateDirective,
    TimelineComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule, MatSidenavModule, MatCardModule,
    MatInputModule, MatCheckboxModule, MatStepperModule, MatSliderModule, MatRadioModule, MatListModule
  ],
  providers: [NavbarService, ThemeService, ClassesService, LectureEditorService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
