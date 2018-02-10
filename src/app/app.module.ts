import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

/* Angular Material Modules */
import {
  MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule, MatSidenavModule, MatCardModule,
  MatInputModule, MatCheckboxModule, MatStepperModule
} from '@angular/material';

/* Services */
import { NavbarService } from './services/navbar/navbar.service';
import { ThemeService } from './services/theme/theme.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UsernameComponent } from './components/username/username.component';
import { CardBoilerplateComponent } from './components/card-boilerplate/card-boilerplate.component';
import { SidenavContentComponent } from './components/home/sidenav-content/sidenav-content.component';
import { ClassesService } from './services/classes/classes.service';
import { LectureEditorComponent } from './components/lecture-editor/lecture-editor.component';
// import { DoneTickComponent } from './components/done-tick/done-tick.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    UsernameComponent,
    CardBoilerplateComponent,
    SidenavContentComponent,
    LectureEditorComponent,
    // DoneTickComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    FlexLayoutModule,
    MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule, MatSidenavModule, MatCardModule,
    MatInputModule, MatCheckboxModule, MatStepperModule
  ],
  providers: [NavbarService, ThemeService, ClassesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
