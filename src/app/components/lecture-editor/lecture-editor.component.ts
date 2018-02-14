import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { DoneTickComponent } from '../done-tick/done-tick.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-lecture-editor',
  templateUrl: './lecture-editor.component.html',
  styleUrls: ['./lecture-editor.component.scss']
})
export class LectureEditorComponent implements OnInit, OnDestroy {

  public lectureEndTime: number // End time in seconds

  constructor(private _themeService: ThemeService) {
    this.lectureEndTime = 3000
  }

  ngOnInit() {
    this._themeService.changeThemeClass("deep-purple");
  }

  ngOnDestroy() {
    this._themeService.changeThemeClass("default");
  }

}
