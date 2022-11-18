import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTrialplanComponent } from './add-edit-trialplan.component';

describe('AddEditTrialplanComponent', () => {
  let component: AddEditTrialplanComponent;
  let fixture: ComponentFixture<AddEditTrialplanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditTrialplanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditTrialplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
