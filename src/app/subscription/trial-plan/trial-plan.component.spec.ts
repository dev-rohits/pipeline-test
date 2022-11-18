import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrialPlanComponent } from './trial-plan.component';

describe('TrialPlanComponent', () => {
  let component: TrialPlanComponent;
  let fixture: ComponentFixture<TrialPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrialPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrialPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
