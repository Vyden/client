import { Component, OnInit, Input } from '@angular/core';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.scss']
})
export class UsernameComponent implements OnInit {

  @Input() username: string;

  public nameColors: string[] = this._themeService.getThemes().map(themeArray => themeArray[1]);

  constructor(private _themeService: ThemeService) { }

  ngOnInit() {
  }

}
