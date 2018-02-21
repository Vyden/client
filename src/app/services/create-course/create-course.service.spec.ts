import { TestBed, inject } from '@angular/core/testing';

import { CreateCourseService } from './create-course.service';

describe('CreateCourseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateCourseService]
    });
  });

  it('should be created', inject([CreateCourseService], (service: CreateCourseService) => {
    expect(service).toBeTruthy();
  }));
});
