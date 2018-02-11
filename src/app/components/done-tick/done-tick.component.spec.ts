import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneTickComponent } from './done-tick.component';

describe('DoneTickComponent', () => {
  let component: DoneTickComponent;
  let fixture: ComponentFixture<DoneTickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoneTickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoneTickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
