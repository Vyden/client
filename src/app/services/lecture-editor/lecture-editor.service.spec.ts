import { TestBed, inject } from '@angular/core/testing';

import { LectureEditorService } from './lecture-editor.service';

describe('LectureEditorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LectureEditorService]
    });
  });

  it('should be created', inject([LectureEditorService], (service: LectureEditorService) => {
    expect(service).toBeTruthy();
  }));
});
