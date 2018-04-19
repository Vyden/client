import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class ThemeService {

  private themeClassSource = new BehaviorSubject<string>("deep-orange-theme")
  public currentThemeClass = this.themeClassSource.asObservable()

  private themes = [
    // ['default', '#4CAF50'],
    ['red', '#f44336'],
    ['pink', '#E91E63'],
    ['purple', '#9C27B0'],
    ['deep-purple', '#673AB7'],
    ['indigo', '#3F51B5'],
    ['blue', '#2196F3'],
    ['teal', '#009688'],
    ['amber', '#FFC107'],
    ['orange', '#FF9800'],
    ['deep-orange', '#FF5722']
  ]

  constructor() { }

  public changeThemeClass(themeClass: string) {
    this.themeClassSource.next(themeClass+"-theme");
    console.log('theme changed:', themeClass)
  }

  public getThemes() {
    return this.themes;
  }

}
