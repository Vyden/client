import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ClassesService {

  public classes: string[] = ['CS 307: Software Enginerring', 'STAT 350: Introduction to Statistics', 'CS 252: Systems Programming', 'EAPS 111: Physical Geology', 'MA 265: Linear Algebra'];
  // public classes: string[] = [];

  constructor() { }

  public addClass() {
    //Will need to make call to firebase to add class
    //Then make a next() call to push data
  }

  public getClasses(): Observable<string[]> {
    //Will need to make call to firebase to get classes
    return of(this.classes);
  }

}
