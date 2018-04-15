import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseIdDialogComponent } from './course-id-dialog.component';

describe('CourseIdDialogComponent', () => {
  let component: CourseIdDialogComponent;
  let fixture: ComponentFixture<CourseIdDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseIdDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseIdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
