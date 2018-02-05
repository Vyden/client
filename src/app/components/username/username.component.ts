import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})
export class UsernameComponent implements OnInit {

  @Input() username: string;

  public nameColors: string[] = [
    '#f44336',
    '#E91E63',
    '#9C27B0',
    '#673AB7',
    '#3F51B5',
    '#2196F3',
    '#00BCD4',
    '#009688',
    '#8BC34A',
    '#FF9800',
    '#FF5722'
  ]

  constructor() { }

  ngOnInit() {
  }

}
