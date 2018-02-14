import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../../services/theme/theme.service';
import { trigger, style, animate, transition, state} from '@angular/animations';

@Component({
  selector: 'app-sidenav-header',
  templateUrl: './sidenav-header.component.html',
  styleUrls: ['./sidenav-header.component.scss'],
  animations: [
    trigger('enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('250ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('250ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ],
    ),
  ],
})
export class SidenavHeaderComponent implements OnInit {

  public themeClass: string = "default-theme";
  public defaultHeader = true;

  constructor(private _themeService: ThemeService) { }

  ngOnInit() {
    this._themeService.currentThemeClass.subscribe((theme: string) => {
      this.themeClass = theme;
    });
  }

    //Toggle input field for classes
  public toggleHeaderContent() {
    this.defaultHeader = !this.defaultHeader;
  }

}
