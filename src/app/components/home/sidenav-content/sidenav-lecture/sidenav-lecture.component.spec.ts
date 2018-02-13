import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavLectureComponent } from './sidenav-lecture.component';

describe('SidenavLectureComponent', () => {
  let component: SidenavLectureComponent;
  let fixture: ComponentFixture<SidenavLectureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavLectureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavLectureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
