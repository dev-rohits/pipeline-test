import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NrichForInstituteComponent } from './nrich-for-institute.component';

describe('NrichForInstituteComponent', () => {
  let component: NrichForInstituteComponent;
  let fixture: ComponentFixture<NrichForInstituteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NrichForInstituteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NrichForInstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
