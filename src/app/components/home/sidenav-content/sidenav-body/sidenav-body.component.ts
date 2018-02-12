import { Component, OnInit } from '@angular/core';
import { ClassesService } from '../../../../services/classes/classes.service';
import { ThemeService } from '../../../../services/theme/theme.service';

@Component({
  selector: 'app-sidenav-body',
  templateUrl: './sidenav-body.component.html',
  styleUrls: ['./sidenav-body.component.scss']
})
export class SidenavBodyComponent implements OnInit {

  public themeClass: string = "default-theme";
  public sampleClasses: string[] = [];
  public themeColors: string[] = this._themeService.getThemes().map(themeArray => themeArray[1]);

  constructor(private _classesService: ClassesService, private _themeService: ThemeService) { }

  ngOnInit() {
    this._classesService.getClasses().subscribe((classes: string[]) => {
      this.sampleClasses.push(...classes);
    });

    this._themeService.currentThemeClass.subscribe((theme: string) => {
			this.themeClass = theme;
    });
  }

  //Takes index of button as parameter
  //Returns color for button
  public getButtonColor(index: number): string {
    return this.themeColors[index % this.themeColors.length];
  }
}
