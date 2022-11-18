import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMaterialComponent } from './all-material.component';

describe('AllMaterialComponent', () => {
  let component: AllMaterialComponent;
  let fixture: ComponentFixture<AllMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
