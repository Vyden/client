import { Component, OnInit, ViewChild } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { breakpointsProvider, BreakpointsService, BreakpointEvent } from 'angular-breakpoints';
import { NavbarService } from '../../services/navbar/navbar.service';
import { MatSidenav } from '@angular/material';
import { CardBoilerplateComponent } from '../card-boilerplate/card-boilerplate.component';
import { ThemeService } from '../../services/theme/theme.service';
import { ActivatedRoute } from '@angular/router';
import { ClassesService } from '../../services/classes/classes.service';
import { FilterOptions } from '../../models/filter-options';
import { Course } from '../../models/course'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [breakpointsProvider()]
})
export class HomeComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav
  public sidenavMode: string
  public themeClass: string
  public courseId: string
  public currentCourse: Course

  constructor(private _breakpointsService: BreakpointsService,
    private _navbarService: NavbarService,
    private _themeService: ThemeService,
    private _activatedRoute: ActivatedRoute,
    private _classesService: ClassesService) {
    this.sidenavMode = "side"

    /* Listen for breakpoint changes */
    this._breakpointsService.changes.subscribe((bp: BreakpointEvent) => {
      if (bp.name == "xs" || bp.name == "sm") {
        this.sidenavMode = "over"
      } else {
        this.sidenavMode = "side"
      }
    });

    /* Listen for theme changes */
    this._themeService.currentThemeClass
      .subscribe((themeClass: string) => {
        this.themeClass = themeClass
      })

    /* Listen for course ID changes */
    this._activatedRoute.params
      .subscribe((params: any) => {
        this.courseId = params.courseId;
        console.log(this.courseId);
      })

    /* Listen for course changes */
    this._classesService.activeCourse
      .subscribe((course: Course) => {
        this.currentCourse = course
      })
  }

  ngOnInit() {
    this._navbarService.changeLeftSidenav(this.sidenav);

    if (!this.currentCourse) {
      this._themeService.changeThemeClass("default");
    }

    // If the filter does not exist in localstorage, put a new one there
    if (!localStorage.getItem('filter')) {
      this._classesService.changeFilter(new FilterOptions())
    } else {
      const filter: FilterOptions = JSON.parse(localStorage.getItem('filter'))
      this._classesService.changeFilter(filter)
    }
  }

}
