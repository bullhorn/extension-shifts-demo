import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoMatchTabComponent } from './auto-match-tab.component';

describe('AutoMatchTabComponent', () => {
  let component: AutoMatchTabComponent;
  let fixture: ComponentFixture<AutoMatchTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AutoMatchTabComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoMatchTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
