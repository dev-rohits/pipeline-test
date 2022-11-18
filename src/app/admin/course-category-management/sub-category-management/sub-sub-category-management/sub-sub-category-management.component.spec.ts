import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubSubCategoryManagementComponent } from './sub-sub-category-management.component';

describe('SubSubCategoryManagementComponent', () => {
  let component: SubSubCategoryManagementComponent;
  let fixture: ComponentFixture<SubSubCategoryManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubSubCategoryManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubSubCategoryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
