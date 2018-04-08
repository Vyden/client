import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralAnnouncementCardComponent } from './general-announcement-card.component';

describe('GeneralAnnouncementCardComponent', () => {
  let component: GeneralAnnouncementCardComponent;
  let fixture: ComponentFixture<GeneralAnnouncementCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralAnnouncementCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralAnnouncementCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
