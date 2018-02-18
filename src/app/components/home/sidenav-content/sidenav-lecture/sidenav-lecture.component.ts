import { Component, OnInit } from '@angular/core';
import { ClassesService } from '../../../../services/classes/classes.service';
import { ThemeService } from '../../../../services/theme/theme.service';
import { trigger, style, animate, transition, state} from '@angular/animations';

@Component({
  selector: 'app-sidenav-lecture',
  templateUrl: './sidenav-lecture.component.html',
  styleUrls: ['./sidenav-lecture.component.scss'],
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
export class SidenavLectureComponent implements OnInit {

  activeClass: string;
  public themeClass: string;
  public themes: string[][] = this._themeService.getThemes();
  public hover: boolean[] = [];

  constructor(private _classesService: ClassesService, private _themeService: ThemeService) { }

  ngOnInit() {
    this._classesService.activeClass.subscribe((activeClass: string) => {
      this.activeClass = activeClass;
    });

    this._themeService.currentThemeClass.subscribe((theme: string) => {
			this.themeClass = theme;
    });
  }

  backToCourses() {
    this._classesService.selectClass(null);
    this._themeService.changeThemeClass('default');
  }

}
