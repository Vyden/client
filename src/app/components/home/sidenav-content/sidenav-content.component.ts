import { Component, OnInit } from '@angular/core';
import { ClassesService } from '../../../services/classes/classes.service';
import { AuthService } from '../../../services/auth/auth.service';
import { UserInfo } from '../../../models/userInfo';

@Component({
  selector: 'app-sidenav-content',
  templateUrl: './sidenav-content.component.html',
  styleUrls: ['./sidenav-content.component.scss']
})
export class SidenavContentComponent implements OnInit {

  public showClasses: boolean = true;

  constructor(private _classesService: ClassesService, private _authService: AuthService) { }

  ngOnInit() {
    this._classesService.activeClass.subscribe((selectedClass: string) => {
      if (selectedClass === null) {
        this.showClasses = true;
      } else {
        this.showClasses = false;
      }

      /* Subscribe to changes to the user */
      this._authService.currentUserObservable
        .subscribe((user: any) => {
          // Allows page access only if the user is logged in
          this._authService.checkLogin();
      })
    });
  }




}
