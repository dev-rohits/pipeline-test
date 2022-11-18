import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactNrichComponent } from './contact-nrich.component';

describe('ContactNrichComponent', () => {
  let component: ContactNrichComponent;
  let fixture: ComponentFixture<ContactNrichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactNrichComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactNrichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
