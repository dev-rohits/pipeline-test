import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentSubscriptionPlanComponent } from './current-subscription-plan.component';

describe('CurrentSubscriptionPlanComponent', () => {
  let component: CurrentSubscriptionPlanComponent;
  let fixture: ComponentFixture<CurrentSubscriptionPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentSubscriptionPlanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentSubscriptionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
