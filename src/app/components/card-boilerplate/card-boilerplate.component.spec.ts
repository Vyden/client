import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBoilerplateComponent } from './card-boilerplate.component';

describe('CardBoilerplateComponent', () => {
  let component: CardBoilerplateComponent;
  let fixture: ComponentFixture<CardBoilerplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardBoilerplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBoilerplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
