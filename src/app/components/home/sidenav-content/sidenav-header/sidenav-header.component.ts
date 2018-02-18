import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../../../services/theme/theme.service';
import { ClassesService } from '../../../../services/classes/classes.service';
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

  constructor(private _themeService: ThemeService, private _classesService: ClassesService) { }

  ngOnInit() {
    this._themeService.currentThemeClass.subscribe((theme: string) => {
      this.themeClass = theme;
    });
  }

  //Toggle input field for classes
  public toggleHeaderContent() {
    this.defaultHeader = !this.defaultHeader;
  }

  public addCourse() {
    const classInput = <HTMLInputElement>(document.querySelector('#class-code-input'));
    const classID = classInput.value;
    if (classID.length !== 0) {
      this._classesService.addClass(classID);
      this.toggleHeaderContent();
     }
  }

  public isEnter(event: KeyboardEvent) {
    if(event.keyCode === 13 || event.which === 13) {
      event.preventDefault();
      this.addCourse();
    }
  }
}
