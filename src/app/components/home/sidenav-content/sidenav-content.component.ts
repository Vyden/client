import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../services/theme/theme.service';
import { ClassesService } from '../../../services/classes/classes.service';

@Component({
  selector: 'app-sidenav-content',
  templateUrl: './sidenav-content.component.html',
  styleUrls: ['./sidenav-content.component.scss']
})
export class SidenavContentComponent implements OnInit {

  public themeClass: string = "default-theme";
  public sampleClasses: string[] = [];
  public themeColors: string[] = this._themeService.getThemes().map(themeArray => themeArray[1]);

  constructor(private _themeService: ThemeService, private _classesService: ClassesService) { }

  ngOnInit() {
		this._themeService.currentThemeClass.subscribe((theme: string) => {
			this.themeClass = theme;
    });

    this._classesService.getClasses().subscribe((classes: string[]) => {
      this.sampleClasses.push(...classes);
    })
  }

  //Takes index of button as parameter
  //Returns color for button
  public getButtonColor(index: number): string {
    return this.themeColors[index % this.themeColors.length];
  }


}
