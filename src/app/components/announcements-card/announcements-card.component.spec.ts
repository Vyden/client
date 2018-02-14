import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementsCardComponent } from './announcements-card.component';

describe('AnnouncementsCardComponent', () => {
  let component: AnnouncementsCardComponent;
  let fixture: ComponentFixture<AnnouncementsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnouncementsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
