import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineTvDisplayComponent } from './airline-tv-display.component';

describe('AirlineTvDisplayComponent', () => {
  let component: AirlineTvDisplayComponent;
  let fixture: ComponentFixture<AirlineTvDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirlineTvDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineTvDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
