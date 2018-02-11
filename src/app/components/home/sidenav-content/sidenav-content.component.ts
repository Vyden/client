import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../services/theme/theme.service'

@Component({
  selector: 'app-sidenav-content',
  templateUrl: './sidenav-content.component.html',
  styleUrls: ['./sidenav-content.component.scss']
})
export class SidenavContentComponent implements OnInit {

  public themeClass: string = "default-theme";
  public sampleClasses: string[] = ['CS 307: Software Enginerring', 'STAT 350: Introduction to Statistics of Dark Matter and Stuff', 'CS 252: Systems Programming'];

  public themeColors: string[] = this._themeService.getThemes().map(themeArray => themeArray[1]);

  constructor(private _themeService: ThemeService) { }

  ngOnInit() {
		this._themeService.currentThemeClass.subscribe((theme: string) => {
			this.themeClass = theme;
		});
  }

  public getButtonColor(index: number): string {
    return this.themeColors[index % this.themeColors.length];
  }
}
