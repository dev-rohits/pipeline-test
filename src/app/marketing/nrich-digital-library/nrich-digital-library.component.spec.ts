import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NrichDigitalLibraryComponent } from './nrich-digital-library.component';

describe('NrichDigitalLibraryComponent', () => {
  let component: NrichDigitalLibraryComponent;
  let fixture: ComponentFixture<NrichDigitalLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NrichDigitalLibraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NrichDigitalLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
