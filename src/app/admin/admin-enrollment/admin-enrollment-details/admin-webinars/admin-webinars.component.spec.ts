import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWebinarsComponent } from './admin-webinars.component';

describe('AdminWebinarsComponent', () => {
  let component: AdminWebinarsComponent;
  let fixture: ComponentFixture<AdminWebinarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminWebinarsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminWebinarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
