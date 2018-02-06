import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatSidenav } from '@angular/material';


@Injectable()
export class NavbarService {

  /* Left sidenav observable */
  private leftSidenavSource = new BehaviorSubject<MatSidenav>(null)
  public currentLeftSidenav = this.leftSidenavSource.asObservable()

  constructor() { }

  public changeLeftSidenav(leftSidenav: MatSidenav) {
    this.leftSidenavSource.next(leftSidenav)
  }

}
