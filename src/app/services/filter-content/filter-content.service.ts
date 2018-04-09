import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class FilterContentService {

  private filterContentSource = new BehaviorSubject<string>('');
  public filterContent = this.filterContentSource.asObservable();

  setFilterString(filterString: string) {
    this.filterContentSource.next(filterString);
  }

  constructor() { }

}
