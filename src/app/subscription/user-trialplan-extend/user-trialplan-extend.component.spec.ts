import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTrialplanExtendComponent } from './user-trialplan-extend.component';

describe('UserTrialplanExtendComponent', () => {
  let component: UserTrialplanExtendComponent;
  let fixture: ComponentFixture<UserTrialplanExtendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTrialplanExtendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTrialplanExtendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
