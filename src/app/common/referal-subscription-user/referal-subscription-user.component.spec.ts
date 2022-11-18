import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferalSubscriptionUserComponent } from './referal-subscription-user.component';

describe('ReferalSubscriptionUserComponent', () => {
  let component: ReferalSubscriptionUserComponent;
  let fixture: ComponentFixture<ReferalSubscriptionUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferalSubscriptionUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReferalSubscriptionUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
