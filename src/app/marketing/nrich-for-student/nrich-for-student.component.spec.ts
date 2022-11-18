import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NrichForStudentComponent } from './nrich-for-student.component';

describe('NrichForStudentComponent', () => {
  let component: NrichForStudentComponent;
  let fixture: ComponentFixture<NrichForStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NrichForStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NrichForStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
