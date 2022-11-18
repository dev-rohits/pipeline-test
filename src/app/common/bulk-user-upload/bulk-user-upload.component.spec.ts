import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkUserUploadComponent } from './bulk-user-upload.component';

describe('BulkUserUploadComponent', () => {
  let component: BulkUserUploadComponent;
  let fixture: ComponentFixture<BulkUserUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkUserUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkUserUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
