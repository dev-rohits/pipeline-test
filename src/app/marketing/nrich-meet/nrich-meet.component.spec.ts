import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NrichMeetComponent } from './nrich-meet.component';

describe('NrichMeetComponent', () => {
  let component: NrichMeetComponent;
  let fixture: ComponentFixture<NrichMeetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NrichMeetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NrichMeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
