import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NrichForSchoolComponent } from './nrich-for-school.component';

describe('NrichForSchoolComponent', () => {
  let component: NrichForSchoolComponent;
  let fixture: ComponentFixture<NrichForSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NrichForSchoolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NrichForSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
