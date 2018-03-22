import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizDataDialogComponent } from './quiz-data-dialog.component';

describe('QuizDataDialogComponent', () => {
  let component: QuizDataDialogComponent;
  let fixture: ComponentFixture<QuizDataDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizDataDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizDataDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
