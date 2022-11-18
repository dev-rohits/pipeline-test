import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllMaterialComponent } from './admin-all-material.component';

describe('AdminAllMaterialComponent', () => {
  let component: AdminAllMaterialComponent;
  let fixture: ComponentFixture<AdminAllMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAllMaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAllMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
