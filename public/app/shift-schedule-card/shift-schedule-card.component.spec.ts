import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftScheduleCardComponent } from './shift-schedule-card.component';

describe('ShiftScheduleCardComponent', () => {
  let component: ShiftScheduleCardComponent;
  let fixture: ComponentFixture<ShiftScheduleCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShiftScheduleCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftScheduleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
