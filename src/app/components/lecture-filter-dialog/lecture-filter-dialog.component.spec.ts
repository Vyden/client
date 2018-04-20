import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureFilterDialogComponent } from './lecture-filter-dialog.component';

describe('LectureFilterDialogComponent', () => {
  let component: LectureFilterDialogComponent;
  let fixture: ComponentFixture<LectureFilterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectureFilterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectureFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
