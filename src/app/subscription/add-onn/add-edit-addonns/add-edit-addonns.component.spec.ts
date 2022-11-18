import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAddonnsComponent } from './add-edit-addonns.component';

describe('AddEditAddonnsComponent', () => {
  let component: AddEditAddonnsComponent;
  let fixture: ComponentFixture<AddEditAddonnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAddonnsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditAddonnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
