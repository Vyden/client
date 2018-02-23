import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseFilterDialogComponent } from './course-filter-dialog.component';

describe('CourseFilterDialogComponent', () => {
  let component: CourseFilterDialogComponent;
  let fixture: ComponentFixture<CourseFilterDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseFilterDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseFilterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
