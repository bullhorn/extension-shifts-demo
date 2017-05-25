import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingCandidatesCardComponent } from './matching-candidates-card.component';

describe('MatchingCandidatesCardComponent', () => {
  let component: MatchingCandidatesCardComponent;
  let fixture: ComponentFixture<MatchingCandidatesCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatchingCandidatesCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchingCandidatesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
