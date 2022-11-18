import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEnrollmentDetailsComponent } from './admin-enrollment-details.component';

describe('AdminEnrollmentDetailsComponent', () => {
  let component: AdminEnrollmentDetailsComponent;
  let fixture: ComponentFixture<AdminEnrollmentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEnrollmentDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEnrollmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
