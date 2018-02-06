import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { UsernameComponent } from '../username/username.component';
import { NavbarService } from '../../services/navbar/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private leftSidenav: MatSidenav

  constructor(private _navbarService: NavbarService) { }

  ngOnInit() {
    /* Listen for changes to sidenav */
    this._navbarService.currentLeftSidenav
      .subscribe((sidenav: MatSidenav) => {
        this.leftSidenav = sidenav
      })
  }

}
