import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'

@Injectable()
export class ClassesService {

  private classesSource = new BehaviorSubject<string[]>(['CS 307: Software Enginerring', 'STAT 350: Introduction to Statistics', 'CS 252: Systems Programming', 'EAPS 111: Physical Geology', 'MA 265: Linear Algebra']);
  public currentClasses = this.classesSource.asObservable();
  private activeClassSource = new BehaviorSubject<string>(null);
  public activeClass = this.activeClassSource.asObservable();

  constructor() { }

  public addClass() {
    //Will need to make call to firebase to add class
    //Then make a next() call to push data
  }

  public getClasses(){
    //Will need to make call to firebase to get classes
    return this.currentClasses;
  }

  public selectClass(activeClass: string) {
    this.activeClassSource.next(activeClass);
  }

  public getSelectedClass(){
    return this.activeClass;
  }


}
