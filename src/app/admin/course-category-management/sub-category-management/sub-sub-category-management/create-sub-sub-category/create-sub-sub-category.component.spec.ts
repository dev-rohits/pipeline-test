import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubSubCategoryComponent } from './create-sub-sub-category.component';

describe('CreateSubSubCategoryComponent', () => {
  let component: CreateSubSubCategoryComponent;
  let fixture: ComponentFixture<CreateSubSubCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSubSubCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSubSubCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
