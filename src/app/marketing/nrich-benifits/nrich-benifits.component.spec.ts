import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NrichBenifitsComponent } from './nrich-benifits.component';

describe('NrichBenifitsComponent', () => {
  let component: NrichBenifitsComponent;
  let fixture: ComponentFixture<NrichBenifitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NrichBenifitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NrichBenifitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
