import { TestBed, inject } from '@angular/core/testing';

import { PanelContentService } from './panel-content.service';

describe('PanelContentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PanelContentService]
    });
  });

  it('should be created', inject([PanelContentService], (service: PanelContentService) => {
    expect(service).toBeTruthy();
  }));
});
