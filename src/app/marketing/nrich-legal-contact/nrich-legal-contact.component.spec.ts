import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NrichLegalContactComponent } from './nrich-legal-contact.component';

describe('NrichLegalContactComponent', () => {
  let component: NrichLegalContactComponent;
  let fixture: ComponentFixture<NrichLegalContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NrichLegalContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NrichLegalContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
