import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class PanelContentService {

  private panelContentSource = new BehaviorSubject<string>(null);
  public panelContent = this.panelContentSource.asObservable();

  constructor() { }

  public updatePanelContent(content: string) {
    this.panelContentSource.next(content);
  }
}
