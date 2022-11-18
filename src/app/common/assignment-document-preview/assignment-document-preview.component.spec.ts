import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentDocumentPreviewComponent } from './assignment-document-preview.component';

describe('AssignmentDocumentPreviewComponent', () => {
  let component: AssignmentDocumentPreviewComponent;
  let fixture: ComponentFixture<AssignmentDocumentPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignmentDocumentPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentDocumentPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
