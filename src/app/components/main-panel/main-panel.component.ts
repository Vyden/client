import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit {

  public themeClass: string

  constructor(private _themeService: ThemeService) { }

  ngOnInit() {
    this._themeService.currentThemeClass
      .subscribe((themeClass: string) => {
        this.themeClass = themeClass
      })
  }

}
