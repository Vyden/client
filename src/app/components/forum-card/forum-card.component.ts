import { Component, OnInit } from '@angular/core';

/* Services */
import { ThemeService } from '../../services/theme/theme.service';

/* Models */

@Component({
  selector: 'app-forum-card',
  templateUrl: './forum-card.component.html',
  styleUrls: ['./forum-card.component.scss']
})
export class ForumCardComponent implements OnInit {

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
