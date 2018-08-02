import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerDisplayComponent } from './passenger-display.component';

describe('PassengerDisplayComponent', () => {
  let component: PassengerDisplayComponent;
  let fixture: ComponentFixture<PassengerDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassengerDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
