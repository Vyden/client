import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-card-boilerplate',
  templateUrl: './card-boilerplate.component.html',
  styleUrls: ['./card-boilerplate.component.scss']
})
export class CardBoilerplateComponent implements OnInit {

  public themeClass: string

  constructor(private _themeService: ThemeService) { }

  ngOnInit() {
    /* Listen for changes to theme */
    this._themeService.currentThemeClass
      .subscribe((themeClass: string) => {
        this.themeClass = themeClass
      })
  }

}
