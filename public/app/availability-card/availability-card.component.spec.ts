import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityCardComponent } from './availability-card.component';

describe('AvailabilityCardComponent', () => {
  let component: AvailabilityCardComponent;
  let fixture: ComponentFixture<AvailabilityCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AvailabilityCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailabilityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
