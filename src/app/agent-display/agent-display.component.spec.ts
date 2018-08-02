import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentDisplayComponent } from './agent-display.component';

describe('AgentDisplayComponent', () => {
  let component: AgentDisplayComponent;
  let fixture: ComponentFixture<AgentDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
