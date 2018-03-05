import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementPanelComponent } from './announcement-panel.component';

describe('AnnouncementPanelComponent', () => {
  let component: AnnouncementPanelComponent;
  let fixture: ComponentFixture<AnnouncementPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnouncementPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnouncementPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
