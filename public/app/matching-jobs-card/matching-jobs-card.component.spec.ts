import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingJobsCardComponent } from './matching-jobs-card.component';

describe('MatchingJobsCardComponent', () => {
  let component: MatchingJobsCardComponent;
  let fixture: ComponentFixture<MatchingJobsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatchingJobsCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchingJobsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
