import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDemoclassesComponent } from './admin-democlasses.component';

describe('AdminDemoclassesComponent', () => {
  let component: AdminDemoclassesComponent;
  let fixture: ComponentFixture<AdminDemoclassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDemoclassesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDemoclassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
