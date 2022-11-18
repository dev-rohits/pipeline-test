import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactusFaqComponent } from './contactus-faq.component';

describe('ContactusFaqComponent', () => {
  let component: ContactusFaqComponent;
  let fixture: ComponentFixture<ContactusFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactusFaqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactusFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
