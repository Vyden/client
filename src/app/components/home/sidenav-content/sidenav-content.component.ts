import { Component, OnInit } from '@angular/core';
import { ClassesService }  from '../../../services/classes/classes.service';

@Component({
  selector: 'app-sidenav-content',
  templateUrl: './sidenav-content.component.html',
  styleUrls: ['./sidenav-content.component.scss']
})
export class SidenavContentComponent implements OnInit {

  public showClasses: boolean =true;

  constructor(private _classesService: ClassesService) { }

  ngOnInit() {
    this._classesService.activeClass.subscribe((selectedClass: string) => {
      if (selectedClass === null) {
        this.showClasses = true;
      } else {
        this.showClasses = false;
      }
    });
  }




}
