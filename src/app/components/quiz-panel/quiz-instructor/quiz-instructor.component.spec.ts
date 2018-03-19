import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizInstructorComponent } from './quiz-instructor.component';

describe('QuizInstructorComponent', () => {
  let component: QuizInstructorComponent;
  let fixture: ComponentFixture<QuizInstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizInstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
