import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialPreviewComponent } from './material-preview.component';

describe('MaterialPreviewComponent', () => {
  let component: MaterialPreviewComponent;
  let fixture: ComponentFixture<MaterialPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
