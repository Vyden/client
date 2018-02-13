import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../../services/theme/theme.service';

@Component({
  selector: 'app-sidenav-header',
  templateUrl: './sidenav-header.component.html',
  styleUrls: ['./sidenav-header.component.scss']
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
