import { TestBed, inject } from '@angular/core/testing';

import { QuizzesService } from './quizzes.service';

describe('QuizzesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuizzesService]
    });
  });

  it('should be created', inject([QuizzesService], (service: QuizzesService) => {
    expect(service).toBeTruthy();
  }));
});
