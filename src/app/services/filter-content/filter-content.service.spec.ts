import { TestBed, inject } from '@angular/core/testing';

import { FilterContentService } from './filter-content.service';

describe('FilterContentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FilterContentService]
    });
  });

  it('should be created', inject([FilterContentService], (service: FilterContentService) => {
    expect(service).toBeTruthy();
  }));
});
