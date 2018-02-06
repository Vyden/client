import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { breakpointsProvider, BreakpointsService, BreakpointEvent } from 'angular-breakpoints';
import { NavbarService } from '../../services/navbar/navbar.service';
import { MatSidenav } from '@angular/material';
import { CardBoilerplateComponent } from '../card-boilerplate/card-boilerplate.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [breakpointsProvider()]
})
export class HomeComponent implements OnInit {
  
  @ViewChild('sidenav') sidenav: MatSidenav
  public sidenavMode: string

  constructor(private _breakpointsService: BreakpointsService, private _navbarService: NavbarService) {
    this.sidenavMode = "side"

    this._breakpointsService.changes.subscribe((bp: BreakpointEvent) => {
      if (bp.name == "xs" || bp.name == "sm") {
        this.sidenavMode = "over"
      } else {
        this.sidenavMode = "side"
      }
    });
  }

  ngOnInit() {
    this._navbarService.changeLeftSidenav(this.sidenav)
  }

}
