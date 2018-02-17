import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-main-panel',
  templateUrl: './main-panel.component.html',
  styleUrls: ['./main-panel.component.scss']
})
export class MainPanelComponent implements OnInit {

  public themeClass: string

  classList: number[] = [
    // {
    //   "name": "Douglas  Pace"
    // },
    // {
    //   "name": "Mcleod  Mueller"
    // },
    // {
    //   "name": "Day  Meyers"
    // },
    // {
    //   "name": "Aguirre  Ellis"
    // },
    // {
    //   "name": "Cook  Tyson"
    // }
    1 , 2 , 3, 4, 5
  ];


  constructor(private _themeService: ThemeService) { }

  ngOnInit() {
    this._themeService.currentThemeClass
      .subscribe((themeClass: string) => {
        this.themeClass = themeClass
      })
  }

}
